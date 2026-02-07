import Link from "next/link";
import { Video, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900/80 border-t border-zinc-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Video className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <h3
                className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                FreeVideosEdit
              </h3>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              Professional video editing tools in your browser. Fast, secure,
              and easy to use.
            </p>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/trim-video"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  Trim Video
                </Link>
              </li>
              <li>
                <Link
                  href="/video-watermark"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  Add Watermark
                </Link>
              </li>
              <li>
                <Link
                  href="/video-converter"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  Convert Format
                </Link>
              </li>
              <li>
                <Link
                  href="/video-compress"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  Compress Video
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-400 hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © 2026 freevidosedit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-zinc-500 hover:text-zinc-400 transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-zinc-400 transition-colors text-sm"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
