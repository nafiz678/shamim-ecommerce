import { useEffect, useMemo } from "react";
import type { Tables } from "../../../lib/supabase";

import type { ProductFormData } from "../../../lib/types";

import { HugeiconsIcon } from "@hugeicons/react";

import { Image01Icon, X } from "@hugeicons/core-free-icons";

import { CheckboxField, InputField } from "./utils-components";

import {
  deleteProductImage,
  getProductImageUrl,
  validateImages,
} from "./image-upload";

import { updateProductImages } from "./products";

import { toast } from "sonner";

type Product = Tables<"products">;

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  formData: ProductFormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  categories: {
    id: string;
    name: string;
  }[];
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  submitting: boolean;
};

export default function ProductModal({
  open,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  categories,
  images,
  setImages,
  editingProduct,
  setEditingProduct,
  submitting,
}: ProductModalProps) {
  const previews = useMemo(() => {
    return images.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  }, [images]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [previews]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl">
        {/* HEADER */}

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
            type="button"
            onClick={onClose}
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
            />

            <InputField
              label="Old Price"
              name="old_price"
              type="number"
              value={formData.old_price}
              onChange={handleChange}
            />

            <InputField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />

            <InputField
              label="Rating"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
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
              placeholder="Enter product description"
              className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-[color,box-shadow] duration-200 focus-visible:border-border focus-visible:ring-[3px] focus-visible:ring-foreground/20"
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

              <p className="mt-1 text-sm text-neutral-500">PNG, JPG, WEBP</p>

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
                      error instanceof Error ? error.message : "Invalid images",
                    );
                  }
                }}
              />
            </label>

            {/* NEW IMAGES */}

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

            {!!editingProduct?.images?.length && (
              <div className="mt-5 flex flex-wrap gap-4">
                {editingProduct.images.map((img, idx) => (
                  <div key={img} className="group relative">
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

                          const updatedImages = editingProduct.images.filter(
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
                        } catch {
                          toast.error("Failed to delete image");
                        }
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow transition group-hover:opacity-100"
                    >
                      <HugeiconsIcon icon={X} size={12} />
                    </button>
                  </div>
                ))}
              </div>
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
              onClick={onClose}
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
  );
}
