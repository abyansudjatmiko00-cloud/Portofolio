import { ImageResponse } from "next/og";

export const alt = "Abyannz. — Web Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0f172a",
        color: "#f8fafc",
        padding: "70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#38bdf8",
          }}
        >
          ABYANNZ.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 35,
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          Muhammad Abyan Sudjatmiko.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#94a3b8",
          }}
        >
          Web Developer · Student · Creator
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#64748b",
          }}
        >
          portofolio-abyanzz.vercel.app
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            color: "#38bdf8",
          }}
        >
          BUILD BETTER.
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}