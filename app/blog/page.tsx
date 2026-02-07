import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/blog`;

export const metadata: Metadata = {
  title: "Video Editing Blog - Tips, Tricks & Tutorials",
  description:
    "Learn how to edit videos like a pro. Free tutorials on trimming, compressing, converting, and adding watermarks to videos. Expert tips for YouTube, TikTok, and Instagram.",
  keywords: [
    "video editing tips",
    "video editing tutorials",
    "how to edit videos",
    "video compression guide",
    "video trimming tutorial",
    "youtube video editing",
    "tiktok video tips",
    "instagram video editing",
    "free video editing guide",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Video Editing Blog - Tips, Tricks & Tutorials",
    description:
      "Learn how to edit videos like a pro with our free tutorials and guides.",
    url: pageUrl,
    type: "website",
  },
};

// JSON-LD Schema for Blog Page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": pageUrl,
  url: pageUrl,
  name: "FreeVideosEdit Blog",
  description: "Video editing tips, tricks, and tutorials",
  publisher: {
    "@type": "Organization",
    name: "FreeVideosEdit",
    url: siteUrl,
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    url: `${siteUrl}/blog/${post.slug}`,
  })),
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Our Blog
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Tips, tutorials, and insights to help you create better video
            content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Featured Image (background fallback to avoid broken images) */}
              <div
                className="h-48 w-full relative overflow-hidden bg-zinc-900 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08)), url(${post.imageUrl})`,
                }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                  <span className="px-2 py-1 bg-zinc-800 rounded text-zinc-300">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-zinc-400 text-sm line-clamp-3 mb-4 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-blue-400 text-sm font-medium mt-auto">
                  Read Article{" "}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
