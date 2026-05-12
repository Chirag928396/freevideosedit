import VideoConverter from "@/components/VideoConverter";
import VideoUseCasePage from "@/components/VideoUseCasePage";
import { Metadata } from "next";
import { Clock, Download, FileAudio, Music, Shield, Zap } from "lucide-react";

const siteUrl = "https://freevidosedit.com";
const pageUrl = `${siteUrl}/video-to-mp3`;

export const metadata: Metadata = {
  title: "Free Video to MP3 Converter Online - Extract Audio from Video",
  description:
    "Convert video to MP3 online for free. Extract audio from MP4, MOV, WebM, AVI, and more directly in your browser with private local processing.",
  keywords: [
    "video to mp3",
    "convert video to mp3",
    "extract audio from video",
    "mp4 to mp3",
    "online mp3 converter",
    "free video audio extractor",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free Video to MP3 Converter Online",
    description:
      "Extract audio from video files and download MP3 audio in your browser.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit Video to MP3 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video to MP3 Converter Online",
    description:
      "Extract audio from video files and download MP3 audio in your browser.",
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
      name: "Free Video to MP3 Converter Online",
      description: "Extract MP3 audio from video files in your browser.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "FreeVideosEdit Video to MP3 Converter",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Extract audio from video",
        "Convert MP4, MOV, WebM, and AVI to MP3",
        "Private browser processing",
        "No signup required",
      ],
    },
  ],
};

export default function VideoToMp3Page() {
  return (
    <VideoUseCasePage
      jsonLd={jsonLd}
      title="Convert Video to MP3"
      intro="Extract clean MP3 audio from your videos for podcasts, voice notes, interviews, lessons, and music clips."
      details="Upload a video, choose MP3 in the converter, and download the audio file. Processing runs in your browser, so your original video stays on your device."
      accent="from-sky-500 to-cyan-600"
      tool={<VideoConverter />}
      toolLabel="Video to MP3 converter"
      useCases={[
        {
          title: "Save voice audio",
          description:
            "Turn meeting recordings, class videos, or interviews into small MP3 files.",
          icon: FileAudio,
        },
        {
          title: "Prepare podcasts",
          description:
            "Extract audio from video recordings before sharing or editing the sound track.",
          icon: Music,
        },
        {
          title: "Easy sharing",
          description:
            "MP3 files are lightweight and work in most players, chat apps, and devices.",
          icon: Download,
        },
      ]}
      howToTitle="How to Convert Video to MP3"
      steps={[
        {
          title: "Upload Video",
          description: "Choose an MP4, MOV, WebM, AVI, or another video file.",
        },
        {
          title: "Select MP3",
          description: "In the Convert To panel, choose MP3 as the output.",
        },
        {
          title: "Convert and Download",
          description: "Click Convert & Download to save the extracted audio.",
        },
      ]}
      benefitsTitle="Why Use This MP3 Extractor?"
      benefits={[
        {
          title: "Private Audio Extraction",
          description:
            "Your video is processed locally in the browser instead of being uploaded.",
          icon: <Shield className="h-6 w-6 text-white dark:text-black" />,
        },
        {
          title: "Fast for Short Clips",
          description:
            "Ideal for quick audio extraction from social clips, lessons, and screen recordings.",
          icon: <Zap className="h-6 w-6 text-white dark:text-black" />,
        },
        {
          title: "Useful MP3 Output",
          description:
            "MP3 is widely supported by phones, browsers, media players, and editing apps.",
          icon: <Clock className="h-6 w-6 text-white dark:text-black" />,
        },
      ]}
      faqs={[
        {
          question: "Can I extract audio from MP4 videos?",
          answer:
            "Yes. Upload your MP4 video, select MP3, and the tool will export the audio track.",
        },
        {
          question: "Does this keep the video too?",
          answer:
            "No. When you choose MP3, the download is audio-only. Use the main converter if you need a video format.",
        },
        {
          question: "Are my files uploaded?",
          answer:
            "No. The conversion runs locally in your browser using FFmpeg WebAssembly.",
        },
      ]}
    />
  );
}
