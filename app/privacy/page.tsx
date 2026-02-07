import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data Stays Private",
  description:
    "FreeVideosEdit privacy policy. Your videos are processed locally in your browser and never uploaded to our servers. Learn how we protect your privacy.",
  keywords: [
    "privacy policy",
    "video editor privacy",
    "data protection",
    "browser processing",
    "local video editing",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Privacy Policy - FreeVideosEdit",
    description:
      "Your videos never leave your device. Learn about our privacy-first approach.",
    url: pageUrl,
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1
          className="text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Privacy Policy
        </h1>
        <p className="text-zinc-400 text-lg mb-12">
          &quot;Last Updated&quot;: January 2, 2026
        </p>

        <div className="space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Your Privacy Matters
            </h2>
            <p className="leading-relaxed">
              At freevidosedit, we take your privacy seriously. Unlike many
              online video editors, we process all your videos directly in your
              browser using WebAssembly technology. This means your videos never
              leave your device and are never uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Data We Collect
            </h2>
            <p className="leading-relaxed mb-4">
              We collect minimal data to provide and improve our services:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Analytics Data:</strong> We use anonymous analytics to
                understand how visitors use our site (page views, browser type,
                device type).
              </li>
              <li>
                <strong>Contact Information:</strong> If you contact us through
                our contact form, we collect your email and message.
              </li>
              <li>
                <strong>No Video Data:</strong> We never collect, store, or have
                access to the videos you edit.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our service</li>
              <li>To improve user experience</li>
              <li>To respond to support requests</li>
              <li>To detect and prevent technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
            <p className="leading-relaxed">
              We use minimal cookies for analytics and to remember your
              preferences (like theme settings). You can disable cookies in your
              browser settings, though some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Third-Party Services
            </h2>
            <p className="leading-relaxed">
              We may use third-party analytics services (like Google Analytics)
              to help us understand how our service is used. These services may
              collect information sent by your browser as part of a web page
              request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="leading-relaxed">
              Our service is not directed to children under 13. We do not
              knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at:{" "}
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
