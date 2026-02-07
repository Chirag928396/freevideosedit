import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Video } from "lucide-react";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/about`;

export const metadata: Metadata = {
  title: "About Us - Our Mission & Story",
  description:
    "Learn about FreeVideosEdit's mission to make professional video editing accessible to everyone. Free, browser-based video tools with no downloads required.",
  keywords: [
    "about freevidosedit",
    "free video editor company",
    "online video tools",
    "browser video editing",
    "video editing mission",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "About FreeVideosEdit - Our Mission & Story",
    description:
      "Learn about our mission to make professional video editing accessible to everyone.",
    url: pageUrl,
    type: "website",
  },
};

// JSON-LD Schema for About Page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": pageUrl,
  url: pageUrl,
  name: "About FreeVideosEdit",
  description:
    "Learn about FreeVideosEdit's mission to make professional video editing accessible to everyone.",
  mainEntity: {
    "@type": "Organization",
    name: "FreeVideosEdit",
    url: siteUrl,
    foundingDate: "2024",
    description:
      "FreeVideosEdit provides free, browser-based video editing tools accessible to everyone.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            About Us
          </h1>
          <p className="text-xl text-zinc-400">
            Empowering creators with powerful, accessible video tools.
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Section */}
          <section className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-zinc-800 rounded-xl hidden md:block">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  At freevidosedit, we believe that high-quality video editing
                  shouldn&apos;t require expensive software or powerful
                  computers. Our mission is to democratize video creation by
                  providing professional-grade tools that run directly in your
                  web browser.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                Founded in 2024, freevidosedit started with a simple
                frustration: why is it so hard to just trim a video or add a
                watermark without downloading 500MB of software?
              </p>
              <p>
                We set out to build a suite of tools that leverage modern web
                technologies to perform complex video processing tasks right on
                your device. This means your videos are processed securely on
                your computer and never uploaded to a server, ensuring maximum
                privacy and speed.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
