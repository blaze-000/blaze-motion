import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://motion.asmitsah.dev/sitemap.xml",
    host: "https://motion.asmitsah.dev",
  };
}
