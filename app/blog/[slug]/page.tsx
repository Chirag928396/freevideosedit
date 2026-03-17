import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import { notFound } from "next/navigation";

const siteUrl = "https://freevidosedit.com";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const pageUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      "video editing",
      "tutorial",
      post.category.toLowerCase(),
      ...post.title.toLowerCase().split(" ").slice(0, 5),
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Generate JSON-LD for blog post
function generateJsonLd(post: (typeof blogPosts)[0]) {
  const pageUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": pageUrl,
    url: pageUrl,
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "FreeVideosEdit",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: pageUrl,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateJsonLd(post);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500 mb-8">
          <Link
            href="/"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-zinc-300 truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-zinc-500 mb-4">
            <span className="px-3 py-1 bg-gray-200 dark:bg-zinc-800 rounded-full text-gray-700 dark:text-zinc-300">
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 dark:text-zinc-400 mb-8 border-b border-gray-200 dark:border-zinc-800 pb-8">
            <span>By {post.author}</span>
          </div>

          <div
            className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-12 bg-gray-200 dark:bg-zinc-900 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.04)), url(${post.imageUrl})`,
            }}
          />

          <div
            className="text-gray-700 dark:text-zinc-300 space-y-6 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to Action Box */}
          <div className="mt-16 p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl border border-gray-300 dark:border-zinc-700 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to try it yourself?
            </h3>
            <p className="text-gray-600 dark:text-zinc-400 mb-6 max-w-xl mx-auto">
              Start editing your videos now with our free online tools. No
              registration required.
            </p>
            <Link
              href={post.toolLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-bold hover:bg-gray-700 dark:hover:bg-zinc-200 transition-colors"
            >
              Go to {post.toolName}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
