import {
  Video,
  Scissors,
  Droplet,
  FileVideo,
  Minimize2,
  Play,
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
    <div className="min-h-screen bg-zinc-950">
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
          <h2
            className="text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Edit Your Videos Online
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Professional video editing tools in your browser. No downloads, no
            installation required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          <Link href="/trim-video" className="group">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 hover:border-[#ffffff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffffff]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Trim Video</h3>
              <p className="text-zinc-400 text-sm">
                Cut and remove unwanted portions from your videos with precision
                timeline controls.
              </p>
            </div>
          </Link>

          <Link href="/video-watermark" className="group">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 hover:border-[#ffffff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffffff]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Add Watermark
              </h3>
              <p className="text-zinc-400 text-sm">
                Protect your content by adding custom text or image watermarks
                to your videos.
              </p>
            </div>
          </Link>

          <Link href="/video-compress" className="group">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 hover:border-[#ffffff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffffff]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Minimize2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Compress Video
              </h3>
              <p className="text-zinc-400 text-sm">
                Reduce video file size without losing quality. Perfect for
                sharing and uploading.
              </p>
            </div>
          </Link>

          <Link href="/video-converter" className="group">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-8 hover:border-[#ffffff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#ffffff]/10 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileVideo className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Convert Format
              </h3>
              <p className="text-zinc-400 text-sm">
                Convert your videos to MP4, MOV, WebM, MP3, and more formats
                instantly.
              </p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
