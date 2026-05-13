import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/contact`;

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description:
    "Have questions or feedback about FreeVideosEdit? Contact our team. We're here to help with any issues, suggestions, or partnership inquiries.",
  keywords: [
    "contact freevideosedit",
    "video editor support",
    "help video editing",
    "feedback",
    "customer support",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Contact FreeVideosEdit - Get in Touch",
    description:
      "Have questions or feedback? Contact our team. We're here to help.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Contact FreeVideosEdit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FreeVideosEdit",
    description:
      "Have questions or feedback? Contact our team. We're here to help.",
    images: [`${siteUrl}/twitter-image`],
  },
};

// JSON-LD Schema for Contact Page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": pageUrl,
  url: pageUrl,
  name: "Contact FreeVideosEdit",
  description: "Contact the FreeVideosEdit team for support and inquiries.",
  mainEntity: {
    "@type": "Organization",
    name: "FreeVideosEdit",
    url: siteUrl,
    email: "chiragdiyora15@gmail.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9033653267",
      contactType: "customer service",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "438, Opera bussiness hub, lajamani chawk, mota varachha",
      addressLocality: "Surat",
      postalCode: "394101",
      addressCountry: "IN",
    },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-100/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-zinc-800/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-200 dark:bg-zinc-800 rounded-lg">
                  <Mail className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400">
                    chiragdiyora15@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-200 dark:bg-zinc-800 rounded-lg">
                  <Phone className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                    Call Us
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400">
                    +91 9033653267
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-200 dark:bg-zinc-800 rounded-lg">
                  <MapPin className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400">
                    438, Opera Business Hub Lajamani Chowk, Mota Varachha Surat,
                    Gujarat 394101 India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
