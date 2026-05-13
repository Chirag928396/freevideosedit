import VideoCompressor from "@/components/VideoCompressor";
import VideoUseCasePage from "@/components/VideoUseCasePage";
import { Metadata } from "next";
import { Gauge, Instagram, PlaySquare, Shield, Smartphone, Zap } from "lucide-react";

const siteUrl = "https://freevideosedit.com";
const pageUrl = `${siteUrl}/social-media-video`;

export const metadata: Metadata = {
  title: "Free Social Media Video Compressor - Optimize Videos for Sharing",
  description:
    "Compress and optimize videos for Instagram, YouTube Shorts, TikTok, WhatsApp, Discord, and email. Private browser-based video compression.",
  keywords: [
    "social media video compressor",
    "compress video for instagram",
    "compress video for whatsapp",
    "compress video for tiktok",
    "compress video for youtube shorts",
    "optimize video for social media",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Social Media Video Compressor",
    description:
      "Make videos smaller and easier to share on social platforms and messaging apps.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Social Media Video Compressor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Social Media Video Compressor",
    description:
      "Make videos smaller and easier to share on social platforms and messaging apps.",
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
      name: "Free Social Media Video Compressor",
      description:
        "Optimize videos for sharing on social media and messaging apps.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Social Media Video Compressor",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Compress videos for social media",
        "Reduce file size for WhatsApp, Discord, and email",
        "Quality presets",
        "Private browser processing",
      ],
    },
  ],
};

export default function SocialMediaVideoPage() {
  return (
    <VideoUseCasePage
      jsonLd={jsonLd}
      title="Optimize Video for Social Media"
      intro="Compress videos before posting or sending so they upload faster, share more easily, and stay watchable on mobile."
      details="Use the compressor to reduce file size for Instagram, YouTube Shorts, TikTok, WhatsApp, Discord, email, and client previews. Start with Balanced for most clips, then use Small Size when the upload limit matters most."
      accent="from-emerald-500 to-lime-600"
      tool={<VideoCompressor />}
      toolLabel="Social media video compressor"
      useCases={[
        {
          title: "Mobile sharing",
          description:
            "Create smaller files for WhatsApp, Discord, email, and group chats.",
          icon: Smartphone,
        },
        {
          title: "Creator uploads",
          description:
            "Prepare clips for Instagram, TikTok, YouTube Shorts, and other social feeds.",
          icon: Instagram,
        },
        {
          title: "Fast previews",
          description:
            "Send client or team review files without making everyone download huge exports.",
          icon: PlaySquare,
        },
      ]}
      howToTitle="How to Optimize Video for Social Media"
      steps={[
        {
          title: "Upload Video",
          description: "Select the clip you want to post, send, or review.",
        },
        {
          title: "Choose Compression",
          description:
            "Use Balanced for everyday sharing or Small Size for stricter limits.",
        },
        {
          title: "Compress and Download",
          description:
            "Download the smaller video and test it once before uploading.",
        },
      ]}
      benefitsTitle="Why Compress Before Sharing?"
      benefits={[
        {
          title: "Faster Uploads",
          description:
            "Smaller files upload faster on mobile data, weak Wi-Fi, and busy networks.",
          icon: <Zap className="h-6 w-6 text-white dark:text-black" />,
        },
        {
          title: "Better Fit for Limits",
          description:
            "Compression helps when chat apps, email providers, or social platforms reject large files.",
          icon: <Gauge className="h-6 w-6 text-white dark:text-black" />,
        },
        {
          title: "Private Workflow",
          description:
            "Your video stays on your device while the browser prepares a smaller export.",
          icon: <Shield className="h-6 w-6 text-white dark:text-black" />,
        },
      ]}
      faqs={[
        {
          question: "Which compression setting should I use?",
          answer:
            "Balanced is the best starting point for most social videos. Choose Small Size when you need the smallest possible file.",
        },
        {
          question: "Can this help with WhatsApp and email limits?",
          answer:
            "Yes. Compressing reduces file size, which can help videos fit messaging and email attachment limits.",
        },
        {
          question: "Should I trim before compressing?",
          answer:
            "Yes. Removing unused footage first usually gives a smaller file and a faster compression process.",
        },
      ]}
    />
  );
}
