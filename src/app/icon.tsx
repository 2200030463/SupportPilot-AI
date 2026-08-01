import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "linear-gradient(to bottom right, #10b981, #06b6d4)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#080d1a",
          borderRadius: "36px",
          fontWeight: 800,
        }}
      >
        SP
      </div>
    ),
    {
      ...size,
    }
  );
}
