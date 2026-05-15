import { useEffect, useMemo, useState } from "react";
import type { Tables, TablesInsert, TablesUpdate } from "../../../lib/supabase";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
  Image01Icon,
} from "@hugeicons/core-free-icons";

import Button from "../../../components/ui/button";

import {
  deleteProductImage,
  getProductImageUrl,
  validateImages,
} from "./image-upload";

import { toast } from "sonner";
import { Input } from "../../../components/ui/input";
import type { ProductFormData } from "../../../lib/types";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductImages,
  uploadProductImages,
  useCategories,
  useProducts,
} from "./products";
import { slugify } from "../../../lib/utils";

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
          return toast.error("Failed to create product");
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

  // =======================================================
  // DELETE PRODUCT
  // =======================================================

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

  // =======================================================
  // RENDER
  // =======================================================

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

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl">
            {/* MODAL HEADER */}

            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingProduct ? "Edit Product" : "Create Product"}
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Manage product details and images.
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-neutral-200 p-2 transition hover:bg-neutral-100"
              >
                <HugeiconsIcon icon={X} size={18} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                />

                <InputField
                  label="Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Enter slug"
                />

                <InputField
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Category
                  </label>

                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="h-12 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-black"
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <InputField
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />

                <InputField
                  label="Old Price"
                  name="old_price"
                  type="number"
                  value={formData.old_price}
                  onChange={handleChange}
                  placeholder="Enter old price"
                />

                <InputField
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                />

                <InputField
                  label="Rating"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Enter rating (0-5)"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus-visible:border-border focus-visible:ring-foreground/20 transition-[color,box-shadow] duration-200 focus-visible:ring-[3px]"
                  placeholder="Enter product description"
                />
              </div>

              {/* IMAGE UPLOAD */}

              <div>
                <label className="mb-3 block text-sm font-medium text-neutral-700">
                  Product Images
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-300 p-8 text-center transition hover:border-black">
                  <HugeiconsIcon
                    icon={Image01Icon}
                    size={40}
                    className="mb-3 text-neutral-400"
                  />

                  <p className="font-medium">Upload Product Images</p>

                  <p className="mt-1 text-sm text-neutral-500">
                    PNG, JPG, WEBP
                  </p>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      if (!e.target.files) return;

                      const files = Array.from(e.target.files);

                      try {
                        validateImages(files);

                        setImages(files);
                      } catch (error) {
                        toast.error(
                          error instanceof Error
                            ? error.message
                            : "Invalid images",
                        );
                      }
                    }}
                  />
                </label>

                {/* PREVIEW IMAGES */}

                <div className="mt-5 flex flex-wrap gap-4">
                  {previews.map(({ preview }, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={preview}
                        className="h-28 w-28 rounded-2xl border object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setImages((prev) => prev.filter((_, i) => i !== idx));
                        }}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
                      >
                        <HugeiconsIcon icon={X} size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* EXISTING IMAGES */}
                {editingProduct?.images?.length ? (
                  <div className="mt-5 flex flex-wrap gap-4">
                    {editingProduct.images.map((img, idx) => (
                      <div key={img} className="relative group">
                        <img
                          src={getProductImageUrl(img)}
                          className="h-28 w-28 rounded-2xl border object-cover"
                        />

                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await deleteProductImage(img);
                              if (!editingProduct.images) {
                                return toast.error("No images found");
                              }
                              const updatedImages =
                                editingProduct.images.filter(
                                  (_, i) => i !== idx,
                                );

                              await updateProductImages(
                                editingProduct.id,
                                updatedImages,
                              );

                              setEditingProduct((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      images: updatedImages,
                                    }
                                  : prev,
                              );

                              toast.success("Image deleted");
                            } catch (err) {
                              toast.error("Failed to delete image" + err);
                            }
                          }}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                          <HugeiconsIcon icon={X} size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-neutral-400">
                    No existing images
                  </p>
                )}
              </div>

              {/* CHECKBOXES */}

              <div className="flex flex-wrap gap-5">
                <CheckboxField
                  label="Active Product"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />

                <CheckboxField
                  label="Featured Product"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                />
              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium transition hover:bg-neutral-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingProduct
                      ? "Update Product"
                      : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function TableData({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td
      className={`px-6 py-5 text-sm text-neutral-700 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </td>
  );
}

function InputField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground/75">
        {label}
      </label>

      <Input
        {...props}
        className="h-10 w-full rounded-xl! border border-border px-4 text-sm transition-all duration-300 ease-in-out"
      />
    </div>
  );
}

function CheckboxField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-neutral-600">
      <input
        {...props}
        type="checkbox"
        className="size-4 rounded border-neutral-300"
      />

      {label}
    </label>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <div
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </div>
  );
}
