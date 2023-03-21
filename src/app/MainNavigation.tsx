import clsx from "clsx";
import { headers } from "next/headers";
import Link from "next/link";

import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt, faNewspaper } from "@fortawesome/sharp-solid-svg-icons";
import { faMastodon, faTwitter } from "@fortawesome/free-brands-svg-icons";

import { faDDLogo } from "@lib/icons";
import SiteMenu from "./SiteMenu";
import { SiteSection } from "./menus";
import ThemeMenu from "./ThemeMenu";

function MainNavItem({
  href,
  label,
  icon,
  isActive = false,
  showIconOnly = false,
}: {
  href: string;
  label: string;
  isActive?: boolean;
  icon?: IconProp;
  showIconOnly?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx([
        "inline-flex gap-2 leading-none px-2 h-10 items-center rounded-xl hover:bg-orange-200 dark:hover:bg-stone-600",
        isActive &&
          " bg-stone-200 hover:bg-orange-300 dark:bg-stone-700 dark:hover:bg-stone-700",
      ])}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} size={showIconOnly ? "lg" : "sm"} />
      )}
      <span
        className={clsx([
          !showIconOnly && "font-bold",
          showIconOnly && "sr-only",
        ])}
      >
        {label}
      </span>
    </Link>
  );
}

export default function MainNavigation() {
  const headersList = headers();
  const urlHeader = headersList.get("x-request-url") as string;
  const requestUrl = new URL(urlHeader);

  const pathname = requestUrl.pathname.slice(1);
  const pathSegments = pathname.split("/");
  let sectionName: SiteSection | null = null;

  if (pathname.match(/^post/)) sectionName = "blog";
  else if (pathname.match(/^about/)) sectionName = "about";
  else if (!pathname) sectionName = "home";

  return (
    <header
      id="nav-parent"
      className="px-inset h-20 flex gap-8 items-center justify-between"
    >
      <div>
        <Link href="/">
          <FontAwesomeIcon icon={faDDLogo} size="2x" />
          <span className="sr-only">David Demaree</span>
        </Link>
      </div>

      {/* <ThemeMenu /> */}
      <SiteMenu activeSection={sectionName} />
    </header>
  );
}
