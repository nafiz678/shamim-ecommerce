import type { Preview } from "@storybook/tanstack-react";
import "../src/index.css";

const preview: Preview = {
  parameters: {

    // 👇 Controls configuration (safe + clean UI)
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: "alpha",
    },

    // 👇 Accessibility testing (production-safe setup)
    a11y: {
      test: "error", // ✅ FAIL CI if issues exist (best for production)
      options: {
        rules: {
          // You can fine-tune rules here
          "color-contrast": { enabled: true },
        },
      },
    },

    // 👇 Docs improvement
    docs: {
      autodocs: "tag",
    },

    // 👇 Better story sorting
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Components", "*"],
      },
    },

    viewport: {
      viewports: {
        mobile1: {
          name: "Small Mobile",
          styles: { width: "360px", height: "640px" },
        },
        mobile2: {
          name: "Large Mobile",
          styles: { width: "414px", height: "896px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },

    // 👇 Backgrounds for UI testing in light/dark modes
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
        { name: "gray", value: "#f3f4f6" },
      ],
    },
  },

  // 👇 Global toolbar (important for real-world testing)
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },

  // 👇 Apply theme class globally (important for Tailwind projects)
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      return (
        <div className={theme === "dark" ? "dark" : ""}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
