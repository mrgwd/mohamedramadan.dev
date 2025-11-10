import { ImageResponse } from "next/og";
import { getMdxSource } from "@/lib/mdx";
import fs from "fs";
import path from "path";

export const size = {
  width: 1200,
  height: 630,
};
const arabicFont = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/TheYearofHandicrafts-Regular.otf"),
);
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getMdxSource(slug, locale);

  return new ImageResponse(
    (
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        style={{
          backgroundImage:
            "linear-gradient(to top-right, #170927,#170927, #0D021A,#24034A)",
          padding: "0 64px 0 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "200px",
            height: "200px",
            background: "#43184d",
            borderRadius: "100px",
            filter: "blur(100px)",
          }}
        ></div>
        <h1
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{ fontSize: 72, fontWeight: 700, marginTop: "48px" }}
        >
          {post.frontmatter.title}
        </h1>
        <p
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{ fontSize: 40, fontWeight: 400, color: "#dddddd" }}
        >
          {post.frontmatter.description}
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "TheYearofHandicrafts",
          data: arabicFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
