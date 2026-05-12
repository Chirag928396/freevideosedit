import { ImageResponse } from "next/og";

export const alt = "FreeVideosEdit - Free Online Video Editor";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8fafc",
          color: "#111827",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 54,
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#09090b",
              borderRadius: 48,
              display: "flex",
              height: 220,
              justifyContent: "center",
              width: 220,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: 30,
                display: "flex",
                height: 132,
                justifyContent: "center",
                width: 132,
              }}
            >
              <div
                style={{
                  borderBottom: "34px solid transparent",
                  borderLeft: "54px solid #22c55e",
                  borderTop: "34px solid transparent",
                  height: 0,
                  marginLeft: 12,
                  marginTop: 32,
                  width: 0,
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                color: "#0f172a",
                fontSize: 74,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              FreeVideosEdit
            </div>
            <div
              style={{
                color: "#334155",
                fontSize: 36,
                fontWeight: 600,
                lineHeight: 1.25,
                maxWidth: 760,
              }}
            >
              Free browser video tools for trimming, compressing, converting,
              combining, GIFs, MP3 audio, and social sharing.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
