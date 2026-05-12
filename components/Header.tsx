"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Video,
  Menu,
  X,
  BookOpen,
  Info,
  Mail,
  Sparkles,
  Sun,
  Moon,
  Layers,
  Scissors,
  Droplet,
  Minimize2,
  FileVideo,
  ChevronDown,
  Music,
  Image as ImageIcon,
  Smartphone,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const navTools = [
  {
    href: "/video-combine",
    label: "Combine",
    icon: Layers,
    gradient: "from-violet-500 to-indigo-600",
    hoverBg: "hover:bg-violet-50 dark:hover:bg-violet-900/20",
    activeText: "text-violet-600 dark:text-violet-400",
    activeBg: "bg-violet-50 dark:bg-violet-900/20",
    activeBorder: "border-violet-200 dark:border-violet-700/50",
    badge: "NEW",
  },
  {
    href: "/trim-video",
    label: "Trim",
    icon: Scissors,
    gradient: "from-purple-500 to-blue-500",
    hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
    activeText: "text-purple-600 dark:text-purple-400",
    activeBg: "bg-purple-50 dark:bg-purple-900/20",
    activeBorder: "border-purple-200 dark:border-purple-700/50",
    badge: null,
  },
  {
    href: "/video-watermark",
    label: "Watermark",
    icon: Droplet,
    gradient: "from-emerald-500 to-teal-500",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    activeText: "text-emerald-600 dark:text-emerald-400",
    activeBg: "bg-emerald-50 dark:bg-emerald-900/20",
    activeBorder: "border-emerald-200 dark:border-emerald-700/50",
    badge: null,
  },
  {
    href: "/video-compress",
    label: "Compress",
    icon: Minimize2,
    gradient: "from-orange-500 to-red-500",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
    activeText: "text-orange-600 dark:text-orange-400",
    activeBg: "bg-orange-50 dark:bg-orange-900/20",
    activeBorder: "border-orange-200 dark:border-orange-700/50",
    badge: null,
  },
  {
    href: "/video-converter",
    label: "Convert",
    icon: FileVideo,
    gradient: "from-pink-500 to-purple-500",
    hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
    activeText: "text-pink-600 dark:text-pink-400",
    activeBg: "bg-pink-50 dark:bg-pink-900/20",
    activeBorder: "border-pink-200 dark:border-pink-700/50",
    badge: null,
  },
];

const popularPages = [
  {
    href: "/video-to-mp3",
    label: "Video to MP3",
    icon: Music,
  },
  {
    href: "/video-to-gif",
    label: "Video to GIF",
    icon: ImageIcon,
  },
  {
    href: "/social-media-video",
    label: "Social Media Video",
    icon: Smartphone,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 rounded-xl flex items-center justify-center shadow-lg">
            <Video className="w-5 h-5 text-white dark:text-black" strokeWidth={2.5} />
          </div>
          <span
            className="text-2xl font-bold text-gray-900 dark:text-white hidden sm:block"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            FreeVideosEdit
          </span>
        </Link>

        {/* Desktop Nav — icon pill buttons */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navTools.map((tool) => {
            const Icon = tool.icon;
            const active = isActive(tool.href);
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 group ${
                  active
                    ? `${tool.activeBg} ${tool.activeText} ${tool.activeBorder} shadow-sm`
                    : `border-transparent text-gray-500 dark:text-zinc-400 ${tool.hoverBg} hover:text-gray-800 dark:hover:text-zinc-200`
                }`}
              >
                {/* Icon with gradient background */}
                <span
                  className={`w-6 h-6 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}
                >
                  <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </span>
                {tool.label}
                {/* NEW badge */}
                {tool.badge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow leading-none">
                    {tool.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-all duration-200 hover:scale-105"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Hamburger / More menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                isMenuOpen
                  ? "bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white"
                  : "border-gray-200 dark:border-zinc-700/50 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="hidden sm:inline">More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                {/* Tools section — only on mobile (lg hidden) */}
                <div className="lg:hidden p-3 border-b border-gray-100 dark:border-zinc-800">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 px-2 mb-2">
                    Tools
                  </p>
                  <div className="space-y-0.5">
                    {navTools.map((tool) => {
                      const Icon = tool.icon;
                      const active = isActive(tool.href);
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            active
                              ? `${tool.activeBg} ${tool.activeText}`
                              : "text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}
                          >
                            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                          </span>
                          <span>{tool.label} Video</span>
                          {tool.badge && (
                            <span className="ml-auto bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              {tool.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Pages section */}
                <div className="p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 px-2 mb-2">
                    Popular
                  </p>
                  <div className="space-y-0.5 border-b border-gray-100 pb-3 dark:border-zinc-800">
                    {popularPages.map((page) => {
                      const Icon = page.icon;
                      return (
                        <Link
                          key={page.href}
                          href={page.href}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all"
                        >
                          <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
                          </span>
                          {page.label}
                        </Link>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 px-2 mb-2">
                    Pages
                  </p>
                  <div className="space-y-0.5">
                    <Link
                      href="/features"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all"
                    >
                      <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
                      </span>
                      Features
                    </Link>
                    <Link
                      href="/blog"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all"
                    >
                      <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
                      </span>
                      Blog
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all"
                    >
                      <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Info className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
                      </span>
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white transition-all"
                    >
                      <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
                      </span>
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
