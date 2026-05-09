import type { ReactElement } from "react";
import type { Tables } from "./supabase";
import type { AuthUser } from "../features/auth/auth-slice";
import type { IconSvgElement } from "@hugeicons/react";

export type Option = {
  value: string;
  label: string;
};

export type FeatureItemProps = {
  title: string;
  subtitle: string;
  icon: ReactElement;
};

export type ProductRow = Tables<"products">;
export type ProductImageRow = Tables<"product_images">;

export type ProductProps = ProductRow & {
  images?: ProductImageRow[];
  image?: string | null;
  image_alt?: string | null;
  tags?: string[];
  reviews_count?: number;
  discount_percent?: number | null;
};

export type CategoryProp = { id: number; title: string; image: string };

export type LoginPopoverProps = {
  isOpen: boolean;
  user: AuthUser | null;
  isAuthLoading: boolean;
  onClose: () => void;
};

export type BackendSignupResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
  };
};

export type SignedInViewProps = {
  user: AuthUser;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onLogout: () => void;
};

// dashboard types

export interface Stat {
  title: string;
  value: string;
  icon: IconSvgElement;
  trend: string;
}

export interface Order {
  id: string;
  customer: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  amount: number;
}

export interface Product {
  title: string;
  price: number;
  stock: number;
  rating: number;
}
