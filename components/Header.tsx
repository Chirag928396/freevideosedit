"use client";

import { useTheme } from "@/components/ThemeProvider";
import {
  BookOpen,
  Droplet,
  FileText,
  FileVideo,
  Home,
  Image as ImageIcon,
  Info,
  Layers,
  Mail,
  Minimize2,
  Moon,
  Music,
  Scissors,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    gradient: "from-gray-900 to-gray-700",
    hoverBg: "hover:bg-gray-50 dark:hover:bg-zinc-800",
    activeText: "text-gray-900 dark:text-white",
    activeBg: "bg-gray-100 dark:bg-zinc-800",
    activeBorder: "border-gray-200 dark:border-zinc-700",
    badge: null,
  },
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
  {
    href: "/video-to-mp3",
    label: "Video to MP3",
    icon: Music,
    gradient: "from-sky-500 to-cyan-600",
    hoverBg: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
    activeText: "text-sky-600 dark:text-sky-400",
    activeBg: "bg-sky-50 dark:bg-sky-900/20",
    activeBorder: "border-sky-200 dark:border-sky-700/50",
    badge: null,
  },
  {
    href: "/video-to-gif",
    label: "Video to GIF",
    icon: ImageIcon,
    gradient: "from-fuchsia-500 to-rose-600",
    hoverBg: "hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20",
    activeText: "text-fuchsia-600 dark:text-fuchsia-400",
    activeBg: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    activeBorder: "border-fuchsia-200 dark:border-fuchsia-700/50",
    badge: null,
  },
  {
    href: "/social-media-video",
    label: "Social Video",
    icon: Smartphone,
    gradient: "from-emerald-500 to-lime-600",
    hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    activeText: "text-emerald-600 dark:text-emerald-400",
    activeBg: "bg-emerald-50 dark:bg-emerald-900/20",
    activeBorder: "border-emerald-200 dark:border-emerald-700/50",
    badge: null,
  },
  {
    href: "/features",
    label: "Features",
    icon: Sparkles,
    gradient: "from-amber-500 to-orange-500",
    hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
    activeText: "text-amber-600 dark:text-amber-400",
    activeBg: "bg-amber-50 dark:bg-amber-900/20",
    activeBorder: "border-amber-200 dark:border-amber-700/50",
    badge: null,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: BookOpen,
    gradient: "from-blue-500 to-indigo-600",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    activeText: "text-blue-600 dark:text-blue-400",
    activeBg: "bg-blue-50 dark:bg-blue-900/20",
    activeBorder: "border-blue-200 dark:border-blue-700/50",
    badge: null,
  },
  {
    href: "/about",
    label: "About",
    icon: Info,
    gradient: "from-slate-500 to-slate-700",
    hoverBg: "hover:bg-slate-50 dark:hover:bg-slate-900/20",
    activeText: "text-slate-700 dark:text-slate-300",
    activeBg: "bg-slate-50 dark:bg-slate-900/20",
    activeBorder: "border-slate-200 dark:border-slate-700/50",
    badge: null,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    gradient: "from-teal-500 to-cyan-600",
    hoverBg: "hover:bg-teal-50 dark:hover:bg-teal-900/20",
    activeText: "text-teal-600 dark:text-teal-400",
    activeBg: "bg-teal-50 dark:bg-teal-900/20",
    activeBorder: "border-teal-200 dark:border-teal-700/50",
    badge: null,
  },
  {
    href: "/privacy",
    label: "Privacy",
    icon: Shield,
    gradient: "from-green-500 to-emerald-600",
    hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/20",
    activeText: "text-green-600 dark:text-green-400",
    activeBg: "bg-green-50 dark:bg-green-900/20",
    activeBorder: "border-green-200 dark:border-green-700/50",
    badge: null,
  },
  {
    href: "/terms",
    label: "Terms",
    icon: FileText,
    gradient: "from-zinc-500 to-zinc-700",
    hoverBg: "hover:bg-zinc-50 dark:hover:bg-zinc-800",
    activeText: "text-zinc-700 dark:text-zinc-300",
    activeBg: "bg-zinc-50 dark:bg-zinc-800",
    activeBorder: "border-zinc-200 dark:border-zinc-700",
    badge: null,
  },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg dark:from-white dark:to-gray-200">
            <Video
              className="h-5 w-5 text-white dark:text-black"
              strokeWidth={2.5}
            />
          </div>
          <span
            className="hidden text-2xl font-bold text-gray-900 dark:text-white sm:block"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            FreeVideosEdit
          </span>
        </Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-xl p-2 text-gray-500 transition-all duration-200 hover:scale-105 hover:bg-gray-100 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[1800px] gap-1.5 overflow-x-auto px-4 pb-2 sm:px-6"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex flex-shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                active
                  ? `${item.activeBg} ${item.activeText} ${item.activeBorder} shadow-sm`
                  : `border-transparent text-gray-500 ${item.hoverBg} hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200`
              }`}
            >
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} shadow-sm transition-transform group-hover:scale-110`}
              >
                <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
              {item.badge && (
                <span className="absolute -right-1.5 -top-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white shadow">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
