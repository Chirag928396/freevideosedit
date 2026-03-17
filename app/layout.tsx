import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://freevidosedit.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "FreeVideosEdit - Free Online Video Editor | Trim, Compress, Convert Videos",
    template: "%s | FreeVideosEdit",
  },
  description:
    "Edit videos online for free. Trim, compress, convert, and add watermarks to your videos directly in your browser. No downloads, no signup required. Fast, secure, and easy-to-use video editing tools.",
  keywords: [
    "free video editor",
    "online video editor",
    "video trimmer",
    "video compressor",
    "video converter",
    "video watermark",
    "trim video online",
    "compress video online",
    "convert video online",
    "edit videos free",
    "browser video editor",
    "no download video editor",
    "mp4 editor",
    "video cutter",
    "reduce video size",
  ],
  authors: [{ name: "FreeVideosEdit Team" }],
  creator: "FreeVideosEdit",
  publisher: "FreeVideosEdit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FreeVideosEdit",
    title: "FreeVideosEdit - Free Online Video Editor",
    description:
      "Edit videos online for free. Trim, compress, convert, and add watermarks to your videos directly in your browser. No downloads required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreeVideosEdit - Free Online Video Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeVideosEdit - Free Online Video Editor",
    description:
      "Edit videos online for free. Trim, compress, convert, and add watermarks directly in your browser.",
    images: ["/og-image.png"],
    creator: "@freevidosedit",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1136640429005605" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <meta name="theme-color" content="#09090b" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
