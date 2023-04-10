import type { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";

import { siteUrl } from "@lib/urls";
import SiteContainer from "@/app/SiteContainer";
import ClipPaths from "@components/ClipPaths";
import MainNavigation from "./MainNavigation";
import "../styles/blog.css";
import Script from "next/script";
import DarkModeScript from "@components/DarkModeScript";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/", true)),
  title: {
    default: "David Demaree's website",
    template: "%s | David Demaree",
  },
  authors: [{ name: "David Demaree", url: "https://demaree.me" }],
  creator: "David Demaree",
  description:
    "This is my personal website. I'm a web designer, programmer, and tech-industry product leader. I like LEGOs, cameras, keyboards, and great coffee.",
  openGraph: {
    siteName: "David Demaree's website",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    description:
      "This is my personal website. I'm a web designer, programmer, and tech-industry product leader. I like LEGOs, cameras, keyboards, and great coffee.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" data-theme={""}>
      <head>
        <DarkModeScript />
      </head>
      <body className="bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-200">
        <SiteContainer>
          <MainNavigation />
          {children}
        </SiteContainer>
        <ClipPaths />
      </body>
    </html>
  );
}
