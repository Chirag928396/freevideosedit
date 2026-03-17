"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Video, Menu, X, BookOpen, Info, Mail, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-white rounded-lg flex items-center justify-center shadow-lg">
            <Video
              className="w-5 h-5 text-white dark:text-black"
              strokeWidth={2.5}
            />
          </div>
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            FreeVideosEdit
          </h1>
        </Link>

        {/* Desktop Menu Items */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/trim-video"
            className={`transition-colors font-medium text-[15px] ${
              isActive("/trim-video")
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-400"
            }`}
          >
            Trim Video
          </Link>
          <Link
            href="/video-watermark"
            className={`transition-colors font-medium text-[15px] ${
              isActive("/video-watermark")
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-400"
            }`}
          >
            Add Watermark
          </Link>
          <Link
            href="/video-compress"
            className={`transition-colors font-medium text-[15px] ${
              isActive("/video-compress")
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-400"
            }`}
          >
            Compress Video
          </Link>
          <Link
            href="/video-converter"
            className={`transition-colors font-medium text-[15px] ${
              isActive("/video-converter")
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-400"
            }`}
          >
            Video Converter
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Hamburger Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 space-y-1">
                  <Link
                    href="/blog"
                    className="flex items-center gap-3 px-4 py-3 font-medium text-[15px] text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-3 px-4 py-3 font-medium text-[15px] text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-3 font-medium text-[15px] text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Link>
                </div>

                {/* Mobile Navigation Links (Visible only on small screens inside dropdown) */}
                <div className="md:hidden border-t border-gray-200 dark:border-zinc-800 p-2 space-y-1">
                  <Link
                    href="/trim-video"
                    className="block px-4 py-2 font-medium text-[15px] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    Trim Video
                  </Link>
                  <Link
                    href="/video-watermark"
                    className="block px-4 py-2 font-medium text-[15px] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    Add Watermark
                  </Link>
                  <Link
                    href="/video-compress"
                    className="block px-4 py-2 font-medium text-[15px] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    Compress Video
                  </Link>
                  <Link
                    href="/video-converter"
                    className="block px-4 py-2 font-medium text-[15px] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                  >
                    Video Converter
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
