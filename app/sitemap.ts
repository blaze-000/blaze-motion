import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://motion.asmitsah.dev",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://motion.asmitsah.dev/docs",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
