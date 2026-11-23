import type { MetadataRoute } from "next";
import { sitePages, siteUrl } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(sitePages).map((path) => ({ url: siteUrl(path) }));
}
