import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Badge, type BadgeProps } from "./Badge";


const meta = {
  title: "Components/Badge",
  component: Badge,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["discount", "hot", "sold_out", "sale", "best_deals"],
    },

    children: {
      control: "text",
    },
  },

  args: {
    children: "Discount",
    variant: "discount",
  },
} satisfies Meta<BadgeProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Discount: Story = {
  args: {
    variant: "discount",
    children: "25% OFF",
  },
};

export const Hot: Story = {
  args: {
    variant: "hot",
    children: "HOT",
  },
};

export const SoldOut: Story = {
  args: {
    variant: "sold_out",
    children: "Sold Out",
  },
};

export const Sale: Story = {
  args: {
    variant: "sale",
    children: "Sale",
  },
};

export const BestDeals: Story = {
  args: {
    variant: "best_deals",
    children: "Best Deals",
  },
};

export const LongContent: Story = {
  args: {
    variant: "discount",
    children: "Super Mega Summer Discount Campaign",
  },
};

/* ---------------- SHOWCASE ---------------- */

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="discount">25% OFF</Badge>
      <Badge variant="hot">HOT</Badge>
      <Badge variant="sold_out">Sold Out</Badge>
      <Badge variant="sale">Sale</Badge>
      <Badge variant="best_deals">Best Deals</Badge>
    </div>
  ),
};
