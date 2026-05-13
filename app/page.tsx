import {
  Video,
  Scissors,
  Droplet,
  FileVideo,
  Minimize2,
  Play,
  Layers,
  BadgeCheck,
  Clock,
  Gauge,
  Image as ImageIcon,
  Music,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Metadata } from "next";

const siteUrl = "https://freevideosedit.com";

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
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Online Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Video Editor - FreeVideosEdit",
    description:
      "Trim, compress, convert, combine, watermark, make GIFs, and extract MP3 audio in your browser.",
    images: [`${siteUrl}/twitter-image`],
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
        "https://twitter.com/freevideosedit",
        "https://facebook.com/freevideosedit",
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

          <Link href="/video-to-mp3" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Video to MP3
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Extract audio from videos for podcasts, interviews, voice
                notes, lessons, and quick sharing.
              </p>
            </div>
          </Link>

          <Link href="/video-to-gif" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-rose-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Video to GIF
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Turn short video clips into animated GIFs for messages,
                tutorials, reactions, and product previews.
              </p>
            </div>
          </Link>

          <Link href="/social-media-video" className="group">
            <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-8 hover:border-gray-400 dark:hover:border-white/50 transition-all duration-300 hover:shadow-lg h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Social Media Video
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 text-sm">
                Compress clips for Instagram, TikTok, YouTube Shorts,
                WhatsApp, Discord, email, and reviews.
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

        <section className="mt-24 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
                <BadgeCheck className="h-6 w-6 text-white dark:text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Latest Video Features for Everyday Creators
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600 dark:text-zinc-400">
                FreeVideosEdit is built for fast, practical video jobs that do
                not need a full desktop editor. Use it to prepare social clips,
                compress videos for email, convert files for different devices,
                merge short clips, or add branding before sharing drafts.
              </p>
              <Link
                href="/features"
                className="mt-6 inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Explore Latest Features
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Social video prep",
                  text: "Trim dead air, convert to MP4, and compress clips before posting to YouTube, Instagram, TikTok, or WhatsApp.",
                  icon: Play,
                },
                {
                  title: "Private file handling",
                  text: "Browser-based processing keeps your raw footage on your device instead of sending it to a remote server.",
                  icon: Video,
                },
                {
                  title: "Smaller share files",
                  text: "Use compression presets to reduce large recordings for email, chat apps, client review, and classroom sharing.",
                  icon: Gauge,
                },
                {
                  title: "Fast format fixes",
                  text: "Turn MOV, WebM, AVI, MKV, or other common files into formats that work better on your destination platform.",
                  icon: Clock,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-950/50"
                  >
                    <Icon className="mb-3 h-5 w-5 text-gray-900 dark:text-white" />
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Which Tool Should You Use?
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="grid grid-cols-3 bg-gray-100 text-sm font-bold text-gray-700 dark:bg-zinc-800 dark:text-zinc-200">
              <div className="p-4">Task</div>
              <div className="p-4">Recommended Tool</div>
              <div className="p-4">Best Output</div>
            </div>
            {[
              ["Remove mistakes or silence", "Trim Video", "Short MP4 clip"],
              ["Join several phone clips", "Combine Videos", "One MP4 file"],
              ["Send through email", "Compress Video", "MP4 under the limit"],
              ["Extract audio", "Convert Format", "MP3 audio"],
              ["Make a short loop", "Video to GIF", "Animated GIF"],
              ["Post on social apps", "Social Media Video", "Smaller MP4"],
              ["Protect a preview", "Add Watermark", "Branded MP4"],
            ].map(([task, tool, output]) => (
              <div
                key={task}
                className="grid grid-cols-3 border-t border-gray-200 text-sm text-gray-600 dark:border-zinc-800 dark:text-zinc-400"
              >
                <div className="p-4">{task}</div>
                <div className="p-4">{tool}</div>
                <div className="p-4">{output}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
