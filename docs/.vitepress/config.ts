import { defineConfig } from "vitepress";

export default defineConfig({
  title: "solarium",
  description: "Self-contained works across any medium.",
  themeConfig: {
    nav: [{ text: "para-garden", link: "https://github.com/para-garden" }],
    sidebar: [],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/para-garden/solarium",
      },
    ],
  },
});
