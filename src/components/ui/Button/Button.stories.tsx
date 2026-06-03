import type { Meta, StoryObj } from "@storybook/tanstack-react";

import Button, { type ButtonProps } from "./Button";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { fn } from 'storybook/test';

const meta = {
  title: "Components/Button",
  component: Button,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["accent", "secondary", "outline", "ghost", "dark", "link"],
    },

    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },

    loading: {
      control: "boolean",
    },

    leftIcon: {
      control: false,
    },

    rightIcon: {
      control: false,
    },

    iconClass: {
      control: false,
    },
    href: {
      control: "text",
    },
  },

  args: {
    children: "Button",
    onClick: fn(),
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ---------------- VARIANTS ---------------- */

export const Accent: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Dark: Story = {
  args: { variant: "dark" },
};

export const LinkVariant: Story = {
  args: { variant: "link" },
};

/* ---------------- SIZES ---------------- */

export const Small: Story = {
  args: { size: "sm" },
};

export const Medium: Story = {
  args: { size: "md" },
};

export const Large: Story = {
  args: { size: "lg" },
};

/* ---------------- STATES ---------------- */

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/* ---------------- LINK ---------------- */

export const AsLink: Story = {
  args: {
    href: "/",
    children: "Go to Home",
  },
};

/* ---------------- ICONS ---------------- */

export const WithLeftIcon: Story = {
  args: {
    leftIcon: ArrowLeft02Icon,
    children: "Go Back",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: ArrowRight02Icon,
    children: "Next",
  },
};

/* ---------------- SHOWCASE ---------------- */

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="accent">Accent</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
