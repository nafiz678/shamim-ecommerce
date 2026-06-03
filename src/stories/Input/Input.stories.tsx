import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,

  args: {
    placeholder: "Enter text...",
  },

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    defaultValue: "Invalid value",
  },
};

export const Small: Story = {
  args: {
    inputSize: "sm",
  },
};

export const Large: Story = {
  args: {
    inputSize: "lg",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled Input",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    defaultValue: "secret123",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "john@example.com",
  },
};
