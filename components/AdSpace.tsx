import { CheckCircle, FileVideo, Shield, Sparkles } from "lucide-react";

interface AdSpaceProps {
  position: "left" | "right";
}

export default function AdSpace({ position }: AdSpaceProps) {
  const leftItems = [
    "Trim before compressing to remove wasted seconds.",
    "Use MP4 H.264 when you need the widest compatibility.",
    "Keep short social clips under 60 seconds when possible.",
    "Preview the final file before sharing or uploading.",
  ];

  const rightItems = [
    "Files are processed locally in your browser.",
    "Large 4K clips need more device memory and battery.",
    "Use WebM for website backgrounds and MP4 for sharing.",
    "Add a watermark before posting client previews online.",
  ];

  const items = position === "left" ? leftItems : rightItems;
  const title = position === "left" ? "Editing Checklist" : "Privacy Notes";
  const Icon = position === "left" ? Sparkles : Shield;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20">
        <div className="min-h-[420px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800/50 dark:bg-zinc-900/70">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 dark:bg-white">
              <Icon className="h-5 w-5 text-white dark:text-black" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                Helpful Guide
              </p>
              <h2 className="font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
          </div>

          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span className="text-gray-600 dark:text-zinc-400">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <FileVideo className="h-4 w-4" />
              Best default export
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-zinc-500">
              MP4 with H.264 video and AAC audio is the safest choice for
              YouTube, Instagram, WhatsApp, email, and most browsers.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
