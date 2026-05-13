import VideoConverter from "@/components/VideoConverter";
import VideoUseCasePage from "@/components/VideoUseCasePage";
import { Metadata } from "next";
import { BadgeCheck, Film, Image as ImageIcon, MessageSquare, Shield, Sparkles } from "lucide-react";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/video-to-gif`;

export const metadata: Metadata = {
  title: "Free Video to GIF Converter Online - Make Animated GIFs",
  description:
    "Convert video to GIF online for free. Turn MP4, MOV, WebM, and AVI clips into animated GIFs directly in your browser.",
  keywords: [
    "video to gif",
    "mp4 to gif",
    "convert video to gif",
    "animated gif maker",
    "free gif converter",
    "online video gif maker",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Video to GIF Converter Online",
    description:
      "Create animated GIFs from videos with private browser-based conversion.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Video to GIF Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video to GIF Converter Online",
    description:
      "Create animated GIFs from videos with private browser-based conversion.",
    images: [`${siteUrl}/twitter-image`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "Free Video to GIF Converter Online",
      description: "Create animated GIF files from video clips.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video to GIF Converter",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Convert video to animated GIF",
        "Supports MP4, MOV, WebM, and AVI",
        "Works in browser",
        "No signup required",
      ],
    },
  ],
};

export default function VideoToGifPage() {
  return (
    <VideoUseCasePage
      jsonLd={jsonLd}
      title="Convert Video to GIF"
      intro="Make animated GIFs from short video clips for messages, tutorials, product previews, and quick reactions."
      details="Upload a video, choose GIF in the converter, and export an animated image. For best results, trim long footage first and use a short clip."
      accent="from-fuchsia-500 to-rose-600"
      tool={<VideoConverter />}
      toolLabel="Video to GIF converter"
      useCases={[
        {
          title: "Short reactions",
          description:
            "Turn a small moment from a video into a looping GIF for chat or social posts.",
          icon: MessageSquare,
        },
        {
          title: "Product previews",
          description:
            "Create quick animated demos that can be embedded where video is too heavy.",
          icon: ImageIcon,
        },
        {
          title: "Tutorial snippets",
          description:
            "Show a repeated step from a screen recording without requiring playback controls.",
          icon: Film,
        },
      ]}
      howToTitle="How to Convert Video to GIF"
      steps={[
        {
          title: "Upload Video",
          description:
            "Choose the video clip you want to turn into an animated GIF.",
        },
        {
          title: "Select GIF",
          description: "In the Convert To panel, choose GIF as the output.",
        },
        {
          title: "Create and Download",
          description:
            "Click Convert & Download to save your animated GIF file.",
        },
      ]}
      benefitsTitle="Why Use This GIF Maker?"
      benefits={[
        {
          title: "Simple GIF Creation",
          description:
            "Use one converter for MP4 to GIF, MOV to GIF, WebM to GIF, and other common video inputs.",
          icon: <Sparkles className="h-6 w-6 text-white dark:text-black" />,
        },
        {
          title: "Private Processing",
          description:
            "Your clip is converted locally in the browser, keeping unpublished footage on your device.",
          icon: <Shield className="h-6 w-6 text-white dark:text-black" />,
        },
        {
          title: "Share-Friendly Output",
          description:
            "GIFs work well for short loops in docs, chat tools, support replies, and lightweight previews.",
          icon: <BadgeCheck className="h-6 w-6 text-white dark:text-black" />,
        },
      ]}
      faqs={[
        {
          question: "What video length works best for GIFs?",
          answer:
            "Short clips work best. GIF files can become large quickly, so trim the video first if you only need a few seconds.",
        },
        {
          question: "Can I convert MP4 to GIF?",
          answer:
            "Yes. Upload an MP4 file, select GIF in the converter, and download the animated GIF.",
        },
        {
          question: "Will the GIF include audio?",
          answer:
            "No. GIF is an image format and does not include audio.",
        },
      ]}
    />
  );
}
