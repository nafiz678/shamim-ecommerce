import { supabaseClient } from "../../../lib/supabase-client";
import type { TablesInsert, TablesUpdate } from "../../../lib/supabase";
import { toast } from "sonner";
import { uploadProductImage } from "./image-upload";
import { useQuery } from "@tanstack/react-query";

// =======================================================
// FETCH PRODUCTS
// =======================================================
export async function fetchProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// =======================================================
// FETCH CATEGORIES
// =======================================================
export async function fetchCategories() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

// =======================================================
// CREATE PRODUCT
// =======================================================
export async function createProduct(payload: TablesInsert<"products">) {
  const { data, error } = await supabaseClient
    .from("products")
    .insert(payload)
    .select()
    .single();

  if (error) {
    toast.error(error.message);
    return;
  }
  return data;
}

// =======================================================
// UPDATE PRODUCT
// =======================================================
export async function updateProduct(
  id: string,
  payload: TablesUpdate<"products">,
) {
  const { error } = await supabaseClient
    .from("products")
    .update(payload)
    .eq("id", id);

  if (error) {
    toast.error(error.message);
    return;
  }
}

// =======================================================
// DELETE PRODUCT
// =======================================================
export async function deleteProduct(id: string) {
  const { error } = await supabaseClient.from("products").delete().eq("id", id);

  if (error) {
    toast.error(error.message);
    return;
  }
}

// =======================================================
// UPDATE PRODUCT IMAGES
// =======================================================
export async function updateProductImages(productId: string, images: string[]) {
  const { error } = await supabaseClient
    .from("products")
    .update({ images })
    .eq("id", productId);

  if (error) {
    toast.error(error.message);
    return;
  }
}

// =======================================================
// UPLOAD PRODUCT IMAGES
// =======================================================
export async function uploadProductImages(
  productId: string,
  files: File[],
  existing: string[] = [],
) {
  if (!files.length) return;

  const uploadedPaths: string[] = [];

  for (const file of files) {
    const path = await uploadProductImage(file, productId);
    uploadedPaths.push(path);
  }

  const updatedImages = [...existing, ...uploadedPaths];

  await updateProductImages(productId, updatedImages);

  return updatedImages;
}

// =======================================================
// PRODUCTS QUERY
// =======================================================
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

// =======================================================
// CATEGORIES QUERY
// =======================================================
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}
