import {
  Video,
  Scissors,
  Droplet,
  FileVideo,
  Minimize2,
  Play,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

const siteUrl = "https://freevidosedit.com";

export const metadata: Metadata = {
  title:
    "Free Online Video Editor - Trim, Compress, Convert Videos | FreeVideosEdit",
  description:
    "Edit videos online for free with FreeVideosEdit. Trim, cut, compress, convert, and add watermarks to your videos directly in your browser. No downloads, no signup required. Fast, secure, and easy-to-use.",
  keywords: [
    "free video editor online",
    "online video editor",
    "video trimmer free",
    "video compressor online",
    "video converter free",
    "add watermark to video",
    "cut video online",
    "edit video in browser",
    "no download video editor",
    "browser based video editor",
    "combine videos online",
    "merge videos free",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Free Online Video Editor - Trim, Compress, Convert Videos",
    description:
      "Edit videos online for free. Trim, compress, convert, and add watermarks directly in your browser. No downloads required.",
    url: siteUrl,
    type: "website",
  },
};

// JSON-LD Schema for Homepage
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "FreeVideosEdit",
      description: "Free online video editing tools",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "FreeVideosEdit",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://twitter.com/freevidosedit",
        "https://facebook.com/freevidosedit",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Free Online Video Editor - FreeVideosEdit",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      description:
        "Edit videos online for free. Professional video editing tools in your browser.",
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video Editor",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1250",
        bestRating: "5",
        worstRating: "1",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Edit Your Videos Online
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Professional video editing tools in your browser. No downloads, no
            installation required.
          </p>
          <p className="text-gray-500 dark:text-zinc-500 max-w-3xl mx-auto leading-relaxed">
            FreeVideosEdit is a completely free, browser-based video editing
            platform. Trim unwanted portions, compress large files for easy
            sharing, convert between formats like MP4, MOV, and WebM, or add
            watermarks to protect your content. All processing happens locally
            on your device, so your videos stay private and never get uploaded
            to any server.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {/* Combine Videos — featured card spanning full row on md */}
          <Link href="/video-combine" className="group md:col-span-2 lg:col-span-1">
            <div className="relative bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-200 dark:border-violet-700/40 rounded-xl p-8 hover:border-violet-400 dark:hover:border-violet-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 h-full overflow-hidden">
              {/* NEW badge */}
              <span className="absolute top-4 right-4 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                NEW
              </span>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/30">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Combine Videos
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Merge multiple video clips into one seamless video. Drag to
                reorder, preview each clip, and export as MP4 — all in your
                browser.
              </p>
            </div>
          </Link>

          <Link href="/trim-video" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Trim Video
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Cut and remove unwanted portions from your videos with precision
                timeline controls.
              </p>
            </div>
          </Link>

          <Link href="/video-watermark" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Add Watermark
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Protect your content by adding custom text or image watermarks
                to your videos.
              </p>
            </div>
          </Link>

          <Link href="/video-compress" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Minimize2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Compress Video
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Reduce video file size without losing quality. Perfect for
                sharing and uploading.
              </p>
            </div>
          </Link>

          <Link href="/video-converter" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileVideo className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Convert Format
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Convert your videos to MP4, MOV, WebM, MP3, and more formats
                instantly.
              </p>
            </div>
          </Link>
        </div>


        {/* Why Choose Section */}
        <section className="mt-24 mb-12">
          <h2
            className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Why Choose FreeVideosEdit
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-gray-900 dark:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                100% Browser-Based
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Every tool runs entirely in your browser using WebAssembly
                technology. There is nothing to install, no account to create,
                and no file size limits imposed by a server.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-gray-900 dark:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Private &amp; Secure
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Your videos are processed locally on your device. We never
                upload, store, or access your files. Your content remains yours
                at all times.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-6 h-6 text-gray-900 dark:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Professional Results
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Powered by FFmpeg, the same engine used by professional video
                editors. Get studio-quality output from trimming, compression,
                conversion, and watermarking tools.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
