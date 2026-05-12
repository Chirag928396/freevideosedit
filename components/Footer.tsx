import Link from "next/link";
import { Video, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100/80 dark:bg-zinc-900/80 border-t border-gray-200 dark:border-zinc-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-white rounded-lg flex items-center justify-center shadow-lg">
                <Video
                  className="w-5 h-5 text-white dark:text-black"
                  strokeWidth={2.5}
                />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 dark:text-white"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                FreeVideosEdit
              </h3>
            </div>
            <p className="text-gray-600 dark:text-zinc-400 text-sm mb-4">
              Professional video editing tools in your browser. Fast, secure,
              and easy to use.
            </p>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/video-combine"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Combine Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/trim-video"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Trim Video
                </Link>
              </li>
              <li>
                <Link
                  href="/video-watermark"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Add Watermark
                </Link>
              </li>
              <li>
                <Link
                  href="/video-converter"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Convert Format
                </Link>
              </li>
              <li>
                <Link
                  href="/video-compress"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Compress Video
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Latest Features
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-zinc-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-zinc-500 text-sm">
            © 2026 freevidosedit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-400 transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-400 transition-colors text-sm"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
