import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  FileVideo,
  Gauge,
  Layers,
  Lock,
  Scissors,
  Sparkles,
  Stamp,
} from "lucide-react";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/features`;

export const metadata: Metadata = {
  title: "Latest Online Video Editing Features for 2026",
  description:
    "Explore the latest FreeVideosEdit features for trimming, combining, compressing, converting, and watermarking videos privately in your browser.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Latest Online Video Editing Features for 2026",
    description:
      "A practical guide to FreeVideosEdit video tools, supported formats, privacy features, and recommended export workflows.",
    url: pageUrl,
    type: "website",
  },
};

const features = [
  {
    title: "Timeline trimming",
    description:
      "Select start and end points, preview the selected range, and export only the useful part of a clip.",
    icon: Scissors,
    href: "/trim-video",
  },
  {
    title: "Multi-clip combining",
    description:
      "Upload several clips, reorder them, preview each clip, and export one continuous MP4 video.",
    icon: Layers,
    href: "/video-combine",
  },
  {
    title: "Smart compression presets",
    description:
      "Choose high quality, balanced, or small size depending on whether you care most about clarity or file size.",
    icon: Gauge,
    href: "/video-compress",
  },
  {
    title: "Format conversion",
    description:
      "Convert common video files to MP4, MOV, AVI, WebM, MKV, MP3, or GIF for sharing and publishing.",
    icon: FileVideo,
    href: "/video-converter",
  },
  {
    title: "Text and logo watermarking",
    description:
      "Add a brand, creator handle, copyright notice, or logo overlay before publishing previews or client drafts.",
    icon: Stamp,
    href: "/video-watermark",
  },
  {
    title: "Private browser processing",
    description:
      "Video work runs locally with FFmpeg WebAssembly, so your files do not need to be uploaded to a server.",
    icon: Lock,
    href: "/privacy",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": pageUrl,
  url: pageUrl,
  name: "Latest Online Video Editing Features for 2026",
  description:
    "Feature guide for FreeVideosEdit browser-based video editing tools.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <section className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
            Updated for 2026 workflows
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Latest Video Editing Features
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-zinc-400">
            FreeVideosEdit focuses on practical browser video tasks: clean up a
            clip, make it smaller, change the format, protect it with a
            watermark, or join several clips into one file. This page explains
            what each feature does, when to use it, and which export choice is
            safest for common platforms.
          </p>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-400 dark:border-zinc-800/50 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 transition group-hover:scale-105 dark:bg-white">
                  <Icon className="h-6 w-6 text-white dark:text-black" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </section>

        <section className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/60 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
                <BadgeCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Recommended Export Choices
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600 dark:text-zinc-400">
                The best format depends on where the video will be used. If you
                are unsure, export MP4 because it works on the widest range of
                phones, browsers, messaging apps, and video platforms.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800">
              <div className="grid grid-cols-3 bg-gray-100 text-sm font-bold text-gray-700 dark:bg-zinc-800 dark:text-zinc-200">
                <div className="p-4">Goal</div>
                <div className="p-4">Best Format</div>
                <div className="p-4">Useful Tool</div>
              </div>
              {[
                ["Instagram, YouTube, WhatsApp", "MP4", "Convert or Compress"],
                ["Website background video", "WebM or MP4", "Convert"],
                ["Email attachment", "MP4 under 25 MB", "Trim then Compress"],
                ["Audio-only sharing", "MP3", "Convert"],
                ["Client preview with branding", "MP4 with watermark", "Watermark"],
              ].map(([goal, format, tool]) => (
                <div
                  key={goal}
                  className="grid grid-cols-3 border-t border-gray-200 text-sm text-gray-600 dark:border-zinc-800 dark:text-zinc-400"
                >
                  <div className="p-4">{goal}</div>
                  <div className="p-4">{format}</div>
                  <div className="p-4">{tool}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Before Editing
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
              Check the destination first. A video for email, a short-form
              platform, and a website hero need different file sizes, aspect
              ratios, and formats.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              During Editing
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
              Remove unwanted footage before compressing. Shorter clips process
              faster, produce smaller files, and are easier for viewers to
              watch through to the end.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              After Export
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
              Play the downloaded result once before sending it. Check audio,
              captions burned into the video, watermark position, and visual
              quality on the device your audience will likely use.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
