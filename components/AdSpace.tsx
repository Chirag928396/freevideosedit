/**
 * AdSpace Component - Centralized Ad Management
 *
 * This component is used across ALL pages for consistent ad placement.
 *
 * IMPORTANT: To update ads site-wide, only edit THIS file.
 *
 * Usage:
 * - Left sidebar: <AdSpace position="left" />
 * - Right sidebar: <AdSpace position="right" />
 *
 * Pages using this component:
 * - Home page (/)
 * - All tool pages (/trim-video, /video-watermark, /video-compress, /video-converter, /trim)
 * - Blog page (/blog)
 * - Blog detail pages (/blog/[slug])
 * - About page (/about)
 * - Contact page (/contact)
 * - Privacy page (/privacy)
 * - Terms page (/terms)
 *
 * To add your own ads:
 * 1. Replace the placeholder content below with your ad code
 * 2. You can use images, iframes, or any HTML/JSX
 * 3. Example formats shown in comments below
 */

interface AdSpaceProps {
  position: "left" | "right";
}

export default function AdSpace({ position }: AdSpaceProps) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20">
        <div className="bg-gray-100/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/50 rounded-xl p-4 h-[600px] flex items-center justify-center backdrop-blur-sm">
          {/* 
            ========================================
            EDIT YOUR AD CONTENT BELOW
            ========================================
          */}

          {/* Current: Placeholder */}
          <div className="text-center text-zinc-500">
            {/* <div className="mb-2 text-3xl">📢</div>
            <p className="text-sm">
              {position === "left" ? "Left" : "Right"} Ad Space
            </p>
            <p className="text-xs mt-1 text-zinc-600">160x600</p> */}
          </div>

          {/* 
            Example 1: Image Ad
            --------------------
            <a href="https://your-ad-link.com" target="_blank" rel="noopener noreferrer">
              <img 
                src="/ads/banner-160x600.jpg" 
                alt="Advertisement" 
                className="w-full h-auto rounded-lg"
              />
            </a>
          */}

          {/* 
            Example 2: Google AdSense
            -------------------------
            <ins className="adsbygoogle"
              style={{ display: 'inline-block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX">
            </ins>
          */}

          {/* 
            Example 3: Different ads for left/right
            ----------------------------------------
            {position === 'left' ? (
              <a href="https://left-ad.com" target="_blank" rel="noopener noreferrer">
                <img src="/ads/left-banner.jpg" alt="Left Ad" />
              </a>
            ) : (
              <a href="https://right-ad.com" target="_blank" rel="noopener noreferrer">
                <img src="/ads/right-banner.jpg" alt="Right Ad" />
              </a>
            )}
          */}

          {/* 
            Example 4: HTML/Custom Ad
            --------------------------
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-4 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-bold mb-2">Your Brand</h3>
              <p className="text-sm text-center mb-4">Special Offer!</p>
              <a 
                href="https://your-link.com" 
                className="px-4 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          */}
        </div>
      </div>
    </aside>
  );
}
