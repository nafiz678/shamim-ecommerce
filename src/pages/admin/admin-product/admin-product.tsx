import { useEffect, useMemo, useState } from "react";
import type { Tables, TablesInsert, TablesUpdate } from "../../../lib/supabase";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
  Image01Icon,
} from "@hugeicons/core-free-icons";

import Button from "../../../components/ui/button";

import { deleteProductImage, getProductImageUrl } from "./image-upload";

import { toast } from "sonner";
import type { ProductFormData } from "../../../lib/types";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  uploadProductImages,
  useCategories,
  useProducts,
} from "./products";
import { slugify } from "../../../lib/utils";
import { StatusBadge, TableData, TableHead } from "./utils-components";
import ProductModal from "./product-form-modal";

type ProductsType = Tables<"products">;

const initialForm: ProductFormData = {
  title: "",
  slug: "",
  description: "",
  brand: "",
  category_id: "",
  price: "",
  old_price: "",
  stock: "",
  rating: "",
  is_active: true,
  is_featured: false,
};

export default function AdminProducts() {
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductsType | null>(
    null,
  );
  const [formData, setFormData] = useState<ProductFormData>(initialForm);
  const [images, setImages] = useState<File[]>([]);

  const {
    data: productsData,
    isLoading: productsLoading,
    refetch: refreshProducts,
  } = useProducts();

  const { data: categoriesData } = useCategories();

  const products = useMemo(() => productsData ?? [], [productsData]);
  const categories = categoriesData ?? [];

  const loading = productsLoading;

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const previews = useMemo(() => {
    return images.map((file) => {
      const url = URL.createObjectURL(file);
      return { file, preview: url };
    });
  }, [images]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [previews]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // AUTO GENERATE SLUG
      if (name === "title" && !editingProduct) {
        updated.slug = slugify(value);
      }

      return updated;
    });
  }

  function handleOpenCreate() {
    setEditingProduct(null);
    setFormData(initialForm);
    setImages([]);
    setOpenModal(true);
  }

  function handleOpenEdit(product: ProductsType) {
    setEditingProduct(product);

    setFormData({
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      brand: product.brand || "",
      category_id: product.category_id || "",
      price: String(product.price || ""),
      old_price: String(product.old_price || ""),
      stock: String(product.stock || ""),
      rating: String(product.rating || ""),
      is_active: product.is_active,
      is_featured: product.is_featured,
    });

    setOpenModal(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    if (!formData.price) {
      toast.error("Price is required");
      return;
    }

    try {
      setSubmitting(true);

      if (editingProduct) {
        const payload: TablesUpdate<"products"> = {
          title: formData.title,
          slug: formData.slug,
          description: formData.description || null,
          brand: formData.brand || null,
          category_id: formData.category_id || null,
          price: Number(formData.price),
          old_price: formData.old_price ? Number(formData.old_price) : null,
          stock: Number(formData.stock),
          rating: Number(formData.rating),
          is_active: formData.is_active,
          is_featured: formData.is_featured,
        };

        await updateProduct(editingProduct.id, payload);

        if (images.length > 0) {
          await uploadProductImages(
            editingProduct.id,
            images,
            editingProduct.images || [],
          );
        }

        toast.success("Product updated");
      } else {
        const payload: TablesInsert<"products"> = {
          title: formData.title,
          slug: formData.slug,
          description: formData.description || null,
          brand: formData.brand || null,
          category_id: formData.category_id || null,
          price: Number(formData.price),
          old_price: formData.old_price ? Number(formData.old_price) : null,
          stock: Number(formData.stock),
          rating: Number(formData.rating),
          is_active: formData.is_active,
          is_featured: formData.is_featured,
        };

        const data = await createProduct(payload);

        if (!data) {
          toast.error("Failed to create product");
          return;
        }
        if (images.length > 0) {
          await uploadProductImages(data.id, images, []);
        }

        toast.success("Product created");
      }

      await refreshProducts();

      setOpenModal(false);

      setEditingProduct(null);

      setFormData(initialForm);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(productId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const product = products.find((p) => p.id === productId);

      if (product?.images?.length) {
        await Promise.all(product.images.map((img) => deleteProductImage(img)));
      }
      await deleteProduct(productId);

      refreshProducts();

      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>

            <p className="mt-1 text-sm text-neutral-500">
              Manage products, pricing, inventory and media.
            </p>
          </div>

          <Button
            onClick={handleOpenCreate}
            variant="secondary"
            className="rounded-xl"
            rightIcon={Plus}
          >
            Add Product
          </Button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border px-4 py-3 shadow-sm">
          <HugeiconsIcon icon={Search} size={18} className="text-neutral-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* TABLE */}

        <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-275">
              <thead className="border-b border-border bg-neutral-50">
                <tr>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead align="right">Actions</TableHead>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-24 text-center text-neutral-500"
                    >
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-24 text-center text-neutral-500"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50"
                    >
                      <TableData>
                        <div className="flex items-center">
                          {product.images?.[0] ? (
                            <img
                              src={getProductImageUrl(product.images[0] || "")}
                              alt={product.title}
                              className="h-14 w-14 rounded-2xl border border-neutral-200 object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50">
                              <HugeiconsIcon
                                icon={Image01Icon}
                                size={20}
                                className="text-neutral-400"
                              />
                            </div>
                          )}
                        </div>
                      </TableData>
                      <TableData>
                        <div>
                          <p className="font-medium text-neutral-900">
                            {product.title}
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            {product.slug}
                          </p>
                        </div>
                      </TableData>

                      <TableData>৳{product.price}</TableData>

                      <TableData>{product.stock}</TableData>

                      <TableData>
                        <StatusBadge active={product.is_active} />
                      </TableData>

                      <TableData>
                        {product.is_featured ? "Featured" : "No"}
                      </TableData>

                      <TableData>
                        {new Date(product.created_at).toLocaleDateString()}
                      </TableData>

                      <TableData align="right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="rounded-xl border border-neutral-200 bg-white p-2 transition hover:bg-neutral-100"
                          >
                            <HugeiconsIcon icon={Pencil} size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-xl border border-red-200 bg-white p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <HugeiconsIcon icon={Trash2} size={16} />
                          </button>
                        </div>
                      </TableData>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categories={categories}
        images={images}
        setImages={setImages}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        submitting={submitting}
      />
    </div>
  );
}
