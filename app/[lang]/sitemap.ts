import { MetadataRoute } from "next";
import type { Lang } from "@/types/language/lang";

export default function sitemap({
  lang
}: {
  lang: Lang;
}): MetadataRoute.Sitemap {
  return [
    {
      url: `https://app.trotelcoin.com/${lang}/home`,
      lastModified: new Date(),
      priority: 1
    },
    {
      url: `https://app.trotelcoin.com/${lang}/learn`,
      lastModified: new Date(),
      priority: 0.9
    },
    {
      url: `https://app.trotelcoin.com/${lang}/leaderboard`,
      lastModified: new Date(),
      priority: 0.5
    },
    {
      url: `https://app.trotelcoin.com/${lang}/shop`,
      lastModified: new Date(),
      priority: 0.7
    },
    {
      url: `https://app.trotelcoin.com/${lang}/account`,
      lastModified: new Date(),
      priority: 0.3
    }
  ];
}
