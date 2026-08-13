import type { MetadataRoute } from "next";
import { perfil } from "@/content/perfil";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: perfil.site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
