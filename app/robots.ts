import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/checkout/", "/carrito"],
    },
    sitemap: "https://gangabazar.com.ar/sitemap.xml",
  }
}
