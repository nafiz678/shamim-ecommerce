import type { ReactElement } from "react";
import type { AuthUser } from "../features/auth/auth-slice";
import type { IconSvgElement } from "@hugeicons/react";
import type { Tables } from "./supabase";

export type Option = {
  value: string;
  label: string;
};

export type ProductProps = Tables<"products">

export type FeatureItemProps = {
  title: string;
  subtitle: string;
  icon: ReactElement;
};

export type ProductFormData = {
  title: string;
  slug: string;
  description: string;
  brand: string;
  category_id: string;
  price: string;
  old_price: string;
  stock: string;
  rating: string;
  is_active: boolean;
  is_featured: boolean;
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
