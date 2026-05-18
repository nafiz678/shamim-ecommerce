import type { EmblaOptionsType } from "embla-carousel";
import "./embela.css";
import EmblaCarousel from "./embela-carousel";

export default function Categories() {
  const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };
  return (
    <div className="pt-8">
      <h2 className="flex text-2xl font-semibold text-text items-center justify-center w-full my-10">
        Shop With Categories
      </h2>

      {/* carousals */}
      <EmblaCarousel slides={CATEGORY_DATA} options={OPTIONS} />
    </div>
  );
}

export const CATEGORY_DATA: { id: number; title: string; image: string }[] = [
  {
    id: 1,
    title: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Fashion",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Living",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Beauty",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Sports",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Toys",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    title: "Books",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    title: "Groceries",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    title: "Furniture",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    title: "Shoes",
    image: "/placeholder.svg",
  },
];
