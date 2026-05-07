import type { User } from "@supabase/supabase-js";
import type { ReactElement } from "react";

export type Option = {
  value: string;
  label: string;
};

export type FeatureItemProps = {
  title: string;
  subtitle: string;
  icon: ReactElement
}


export type ProductProps = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  original_price: number | null;
  discount_percent: number | null;
  rating: number | null;
  reviews_count: number | null;
  description: string | null;
  tags: string[];
  stock_status: "available" | "sold_out";
};


export type CategoryProp = { id: number; title: string; image: string };


export type LoginPopoverProps = {
  isOpen: boolean;
  user: User | null;
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


export type SignedInView = {
  user: User;
  isSubmitting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onLogout: () => void;
}