import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/contact`;

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description:
    "Have questions or feedback about FreeVideosEdit? Contact our team. We're here to help with any issues, suggestions, or partnership inquiries.",
  keywords: [
    "contact freevidosedit",
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
    email: "support@freevidosedit.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      availableLanguage: "English",
    },
  },
};

export default function ContactPage() {
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
            Get in Touch
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll
            respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email Us</h3>
                    <p className="text-zinc-400">support@freevidosedit.com</p>
                    <p className="text-zinc-400">partners@freevidosedit.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Call Us</h3>
                    <p className="text-zinc-400">+1 (555) 123-4567</p>
                    <p className="text-zinc-500 text-sm">
                      Mon-Fri from 8am to 5pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Visit Us</h3>
                    <p className="text-zinc-400">
                      123 Video Street, Suite 100
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
              <p className="text-zinc-400 mb-4">
                Have a quick question? Check out our Frequently Asked Questions
                section for immediate answers to common queries.
              </p>
              <a
                href="/#faq"
                className="text-white font-semibold hover:underline"
              >
                Visit FAQ Center &rarr;
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-[#ffffff] to-[#ffffff] hover:from-[#f5f5f5] hover:to-[#f5f5f5] text-black rounded-lg font-bold shadow-lg shadow-[#ffffff]/20 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
