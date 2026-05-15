import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";

const siteUrl = "https://freevideosedit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const pages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/trim-video", changeFrequency: "weekly", priority: 0.9 },
    { path: "/video-compress", changeFrequency: "weekly", priority: 0.9 },
    { path: "/video-converter", changeFrequency: "weekly", priority: 0.9 },
    { path: "/video-watermark", changeFrequency: "weekly", priority: 0.9 },
    { path: "/video-combine", changeFrequency: "weekly", priority: 0.9 },
    { path: "/video-to-mp3", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-to-gif", changeFrequency: "weekly", priority: 0.85 },
    { path: "/social-media-video", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-speed", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-rotate", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-crop", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-mute", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-volume", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-thumbnail", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-reverse", changeFrequency: "weekly", priority: 0.85 },
    { path: "/video-loop", changeFrequency: "weekly", priority: 0.85 },
    { path: "/features", changeFrequency: "weekly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  ];

  const staticPages = pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
