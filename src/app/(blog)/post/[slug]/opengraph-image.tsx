import { ImageResponse } from "next/server";

import ColorThief from "colorthief";
import { decode } from "html-entities";
import colors from "tailwindcss/colors";
import chroma, { Color } from "chroma-js";

import { getSinglePost } from "@lib/wordpress";
import DDIcon from "@components/DDIcon";

export const alt = "demaree.me";

function getColorInfo(color: string | number | number[] | Color) {
  const _col = chroma(color as Color);
  const luminance = chroma(color as Color).luminance();
  const wContrast = chroma.contrast("#ffffff", _col);
  const bContrast = chroma.contrast("#000000", _col);

  return { luminance, wContrast, bContrast };
}

export default async function og({
  params: { slug },
}: {
  params: { slug: string };
}) {
  let color: number[] = chroma(colors.red[600]).rgb();
  let textColor = "#ffffff";
  let imageUrl: string = "https://img.demaree.me/twitter_name/ddemaree.jpg";

  const soehneFontData = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-halbfett.woff"
  ).then((r) => r.arrayBuffer());

  const soeheneFontBuchData = await fetch(
    "https://fonts.demaree.me/soehne/soehne-web-buch.woff"
  ).then((r) => r.arrayBuffer());

  const ivarFontData = await fetch(
    "https://fonts.demaree.me/ivar-text/IvarText-Regular.otf"
  ).then((r) => r.arrayBuffer());

  const post = await getSinglePost(slug);

  if (!post) throw new Error("Post not found");

  if (post.featuredImageURL) {
    imageUrl = post.featuredImageURL;
    color = await ColorThief.getColor(imageUrl);
  }

  const { wContrast, bContrast } = getColorInfo(color);

  if (bContrast > wContrast) {
    textColor = "#000000";
  }

  const resp = new ImageResponse(
    (
      <div tw="flex flex-col bg-red-600 w-screen h-screen items-center justify-center relative">
        <div
          style={{
            color: textColor,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: `rgb(${color.join(" ")})`,
          }}
        ></div>
        {imageUrl && (
          <div
            tw="flex"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "32%",
            }}
          >
            <img
              src={imageUrl}
              tw="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
        )}
        <div
          tw="p-12"
          style={{
            display: "flex",
            position: "absolute",
            right: 0,
            bottom: 0,
            color: textColor,
          }}
        >
          <DDIcon size="80px" />
        </div>
        <div
          tw="flex flex-col items-start justify-center absolute right-0 top-0 bottom-0 p-16 leading-none"
          style={{
            paddingBottom: "108px",
            width: "68%",
            fontFamily: "Soehne",
            color: textColor,
          }}
        >
          <p
            tw="pr-8 m-0 font-semibold"
            style={{
              fontSize: "68px",
              lineHeight: "0.98em",
            }}
          >
            {decode(post.title)}
          </p>
          <p
            tw="m-0"
            style={{
              fontSize: "40px",
              marginTop: "0.5em",
              opacity: 0.7,
            }}
          >
            {decode(post.excerpt)}
          </p>
        </div>
      </div>
    ),
    {
      // debug: true,
      width: 1200,
      height: 600,
      fonts: [
        {
          data: soehneFontData,
          name: "Soehne",
          weight: 600,
        },
        {
          data: soeheneFontBuchData,
          name: "Soehne",
          weight: 400,
        },
        {
          data: ivarFontData,
          name: "IvarText",
          weight: 400,
        },
      ],
    }
  );

  return resp;
}
