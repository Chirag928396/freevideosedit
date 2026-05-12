import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/terms`;

export const metadata: Metadata = {
  title: "Terms of Service - Usage Guidelines",
  description:
    "Terms and conditions for using FreeVideosEdit's free online video editing tools. Understand your rights and our service policies.",
  keywords: [
    "terms of service",
    "video editor terms",
    "usage policy",
    "service agreement",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Terms of Service - FreeVideosEdit",
    description:
      "Terms and conditions for using our free online video editing tools.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - FreeVideosEdit",
    description:
      "Terms and conditions for using our free online video editing tools.",
    images: [`${siteUrl}/twitter-image`],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1
          className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Terms of Service
        </h1>
        <p className="text-gray-600 dark:text-zinc-400 text-lg mb-12">
          Last Updated: January 2, 2026
        </p>

        <div className="space-y-8 text-gray-700 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using freevidosedit, you accept and agree to be
              bound by the terms and provisions of this agreement. If you do not
              agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Use of Service
            </h2>
            <p className="leading-relaxed mb-4">
              Our service is provided free of charge for personal and commercial
              use, subject to the following conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                You must not use the service for any illegal or unauthorized
                purpose
              </li>
              <li>
                You must not attempt to harm or compromise the security of our
                service
              </li>
              <li>
                You are responsible for the content you process through our
                tools
              </li>
              <li>
                You must have the right to edit and distribute any video content
                you upload
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Intellectual Property
            </h2>
            <p className="leading-relaxed">
              You retain all rights to the videos you edit using our service. We
              claim no ownership over your content. Our service, including its
              code, design, and branding, is protected by copyright and other
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Service Availability
            </h2>
            <p className="leading-relaxed">
              We strive to keep freevidosedit available 24/7, but we do not
              guarantee uninterrupted access. We may modify, suspend, or
              discontinue any part of the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              freevidosedit is provided &quot;as is&quot; without warranties of
              any kind. We are not liable for any damages resulting from your
              use of the service, including but not limited to data loss,
              service interruptions, or errors in processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User-Generated Content
            </h2>
            <p className="leading-relaxed">
              You are solely responsible for ensuring you have the legal right
              to use, edit, and distribute any content you process through our
              service. We do not monitor or review user content and assume no
              responsibility for copyright infringement or other violations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Browser-Based Processing
            </h2>
            <p className="leading-relaxed">
              Our tools process videos locally in your browser. Performance
              depends on your device&apos;s capabilities. We recommend using
              modern browsers (Chrome, Firefox, Edge, Safari) for the best
              experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to Terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <p className="leading-relaxed">
              These terms shall be governed by and construed in accordance with
              applicable laws, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="leading-relaxed">
              If you have questions about these Terms of Service, contact us at:{" "}
              <a
                href="mailto:support@freevidosedit.com"
                className="text-blue-400 hover:text-blue-300"
              >
                support@freevidosedit.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
