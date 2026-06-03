import {
  Add01Icon,
  ArrowReloadHorizontalIcon,
  FavouriteIcon,
  MinusSignIcon,
  ShoppingCart02FreeIcons,
  Copy01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import ProductCarousel from "./carousal/product-carousal";
import type { EmblaOptionsType } from "embla-carousel";
import "./carousal/carousal.css";
import { Badge } from "../../components/ui/Badge/Badge";
import Dropdown from "../../components/ui/dropdown";
import {
  ProductShareFacebookIcon,
  ProductSharePinterestIcon,
  TwitterIcon,
} from "../../components/icons/Icon";
import type { ProductDetailsProps } from "../../routes/(public)/shop/$slug";
import { getProductImageUrl } from "../admin/admin-product/image-upload";
import { Button } from "../../components/ui/Button";

export default function ProductsDetailsPage({
  product,
}: {
  product: ProductDetailsProps;
}) {
  const [selectedSize, setSelectedSize] = useState(
    "14-inch-liquid-retina-xdr-display",
  );
  const [selectedMemory, setSelectedMemory] = useState("16gb-unified-memory");
  const [selectedStorage, setSelectedStorage] = useState("1tb-ssd-storage");
  const [isFirstColorActive, setIsFirstColorActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };

  const isInStock = product.stock > 0;

  const discount =
    product.old_price && product.old_price > product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100,
        )
      : 0;

  return (
    <div className="w-full md:w-[90%] lg:w-[85%] xl:w-[70%] mx-auto flex lg:p-0 px-2">
      <div className="grid items-start gap-8 lg:gap-12 py-4 sm:py-6 box-border grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left gallery */}
        <div className="col-span-6">
          <div className="flex w-full items-center justify-center">
            <div className="relative flex w-full items-center justify-center">
              <img
                src={
                  product.images
                    ? getProductImageUrl(product.images[0])
                    : "/assets/images/products/product-page.png"
                }
                alt="MacBook Pro"
                className="h-auto max-w-full rounded-md object-contain"
              />
            </div>
          </div>

          <ProductCarousel slides={ProductImage} options={OPTIONS} />
        </div>

        {/* Right details */}
        <div className="col-span-6 ">
          <div className="flex items-center gap-1">
            <div className="flex text-secondary text-lg leading-none tracking-[1px]">
              {"★".repeat(Math.round(product.rating))}
            </div>
            <div className="text-xs text-foreground/80 font-semibold ml-0.5">
              {product.rating} Star Rating
            </div>
            <div className="text-xxs text-foreground/60">
              (21,671 User feedback)
            </div>
          </div>

          <h1 className="mt-1.5 text-base font-normal text-foreground">
            {product.title}
          </h1>

          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xxs leading-none">
            <div>
              <span className="text-foreground/60">Sku:</span>{" "}
              <span className="font-semibold text-foreground/80">
                {product.id.slice(0, 8)}
              </span>
            </div>
            <div>
              <span className="text-foreground/60">Availability:</span>{" "}
              {isInStock ? (
                <span className="font-semibold text-green-600">In Stock</span>
              ) : (
                <span className="font-semibold text-red-600">Out of Stock</span>
              )}
            </div>
            <div>
              <span className="text-foreground/60">Brand:</span>{" "}
              <span className="font-semibold text-foreground/80">
                {product.brand || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-foreground/60">Category:</span>{" "}
              <span className="font-semibold text-foreground/80">
                {product.category?.name || "Uncategorized"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg leading-none font-semibold text-text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs line-through text-foreground/60">
              {product.old_price ? `$${product.old_price}` : ""}
            </span>
            <Badge variant="discount" className="bg-accent text-xxs font-bold">
              {discount}% OFF
            </Badge>
          </div>

          <div className="mt-4.5 h-px bg-border w-full" />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <div className="mb-2 text-xxs font-medium">Color</div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Select first color"
                  onClick={() => setIsFirstColorActive(true)}
                  className={`flex size-7 items-center justify-center rounded-full cursor-pointer ${
                    isFirstColorActive ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <span className="size-5.5 rounded-full bg-foreground/40" />
                </button>

                <button
                  type="button"
                  aria-label="Select second color"
                  aria-pressed={!isFirstColorActive}
                  onClick={() => setIsFirstColorActive(false)}
                  className={`flex size-7 cursor-pointer items-center justify-center rounded-full ${
                    !isFirstColorActive ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <span className="size-5.5 rounded-full bg-foreground/40" />
                </button>
              </div>
            </div>

            <div>
              <div className="mb-2 text-xxs font-medium text-foreground/80">
                Size
              </div>

              <Dropdown
                onChange={(value) => setSelectedSize(value)}
                options={sizeOptions}
                value={selectedSize}
                dropdownWidth="auto"
                className="w-full whitespace-nowrap border border-border text-xxs text-foreground/60"
                itemClassName="text-xxs"
                triggerClassName="rounded-xs py-2 "
              />
            </div>

            <div>
              <div className="mb-2 text-xxs font-medium text-foreground/80">
                Memory
              </div>

              <Dropdown
                onChange={(value) => setSelectedMemory(value)}
                options={memoryOptions}
                value={selectedMemory}
                dropdownWidth="auto"
                className="w-full whitespace-nowrap border border-border text-xxs text-foreground/60"
                itemClassName="text-xxs"
                triggerClassName="rounded-xs py-2 "
              />
            </div>

            <div>
              <div className="mb-2 text-xxs font-medium text-foreground/80">
                Storage
              </div>

              <Dropdown
                onChange={(value) => setSelectedStorage(value)}
                options={storageOptions}
                value={selectedStorage}
                dropdownWidth="auto"
                className="w-full whitespace-nowrap border border-border text-xxs text-foreground/60"
                itemClassName="text-xxs"
                triggerClassName="rounded-xs py-2 "
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="flex w-full items-center justify-between gap-7 rounded-xs border-2 border-border px-2.5 py-1.5 sm:w-auto">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                <HugeiconsIcon
                  icon={MinusSignIcon}
                  size={13}
                  strokeWidth={1.9}
                />
              </button>

              {/* Animated Quantity */}
              <div className="relative flex h-5 min-w-5 items-center justify-center overflow-hidden">
                <span
                  key={quantity}
                  className="animate-quantity-change text-center text-xs font-medium tabular-nums"
                >
                  {String(quantity).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={increaseQuantity}
                className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted cursor-pointer"
              >
                <HugeiconsIcon icon={Add01Icon} size={13} strokeWidth={1.9} />
              </button>
            </div>

            <Button
              variant="secondary"
              rightIcon={ShoppingCart02FreeIcons}
              className="text-sm font-semibold px-6 sm:px-8 lg:px-6 xl:px-14 rounded-xs w-full sm:w-auto text-nowrap"
            >
              ADD TO CART
            </Button>

            <Button
              variant="outline"
              className="border-2 border-secondary/80 rounded-xs text-secondary font-semibold w-full sm:w-auto text-nowrap"
            >
              BUY NOW
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-3 text-xxs text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 whitespace-nowrap "
              >
                <HugeiconsIcon icon={FavouriteIcon} className="size-4" />
                <span>Add to Wishlist</span>
              </button>

              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 whitespace-nowrap "
              >
                <HugeiconsIcon
                  icon={ArrowReloadHorizontalIcon}
                  size={13}
                  strokeWidth={1.7}
                />
                <span>Add to Compare</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <span className="whitespace-nowrap">Share product:</span>

              <button
                type="button"
                aria-label="Copy product link"
                className="cursor-pointer text-foreground/70 "
              >
                <HugeiconsIcon
                  icon={Copy01Icon}
                  className="size-4 scale-y-[-1]"
                />
              </button>

              <button
                type="button"
                aria-label="Share on Facebook"
                className="cursor-pointer"
              >
                <ProductShareFacebookIcon className="size-4" />
              </button>

              <button
                type="button"
                aria-label="Share on Twitter"
                className="cursor-pointer text-foreground/70 "
              >
                <TwitterIcon fill="color-mix(in srgb, var(--color-foreground) 65%, transparent)" />
              </button>

              <button
                type="button"
                aria-label="Share on Pinterest"
                className="cursor-pointer"
              >
                <ProductSharePinterestIcon className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-4.75 border border-border px-4 py-4">
            <div className="text-sxs font-semibold text-foreground/70 mb-2">
              100% Guarantee Safe Checkout
            </div>
            <img
              src="/assets/images/products/Payment-Method.png"
              alt=""
              className="w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductImage: { id: number; title: string; image: string }[] = [
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
    title: "Home & Living",
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

const sizeOptions: { label: string; value: string }[] = [
  { label: "13-inch Retina display", value: "13-inch-retina-display" },
  {
    label: "14-inch Liquid Retina XDR display",
    value: "14-inch-liquid-retina-xdr-display",
  },
  {
    label: "16-inch Liquid Retina XDR display",
    value: "16-inch-liquid-retina-xdr-display",
  },
];

const memoryOptions: { label: string; value: string }[] = [
  { label: "8GB unified memory", value: "8gb-unified-memory" },
  { label: "16GB unified memory", value: "16gb-unified-memory" },
  { label: "32GB unified memory", value: "32gb-unified-memory" },
];

const storageOptions: { label: string; value: string }[] = [
  { label: "256GB SSD Storage", value: "256gb-ssd-storage" },
  { label: "512GB SSD Storage", value: "512gb-ssd-storage" },
  { label: "1TB SSD Storage", value: "1tb-ssd-storage" },
  { label: "2TB SSD Storage", value: "2tb-ssd-storage" },
];
