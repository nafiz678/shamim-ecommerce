import { supabaseClient } from "../../../lib/supabase-client";

const PRODUCT_BUCKET = "products";

export async function uploadProductImage(file: File, productId: string) {
  const extension = file.name.split(".").pop();

  const fileName = crypto.randomUUID();

  const filePath = `${productId}-${fileName}.${extension}`;

  const { error } = await supabaseClient.storage
    .from(PRODUCT_BUCKET)
    .upload(filePath, file, {
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return filePath;
}

export function getProductImageUrl(path: string) {
  const { data } = supabaseClient.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteProductImage(path: string) {
  await supabaseClient.storage.from(PRODUCT_BUCKET).remove([path]);
}

export function validateImages(files: File[]) {
  const MAX_SIZE = 5 * 1024 * 1024;

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files allowed");
    }

    if (file.size > MAX_SIZE) {
      throw new Error("Image size must be below 5MB");
    }
  }
}
