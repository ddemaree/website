"use client";

import _ from "lodash";
import clsx, { ClassValue } from "clsx";
import { IconLookup, parse } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import { MenuItem } from "./menus";

type MenuItemProps = {
  item: MenuItem;
  isActive?: boolean | (() => boolean);
  activeClass?: ClassValue;
};

export function MobileNavLink(props: MenuItemProps) {
  return (
    <motion.li variants={navItemVariants} className="text-4xl">
      <BasicNavLink {...props} />
    </motion.li>
  );
}

export default function BasicNavLink({
  item,
  isActive,
  activeClass = "scale-105",
}: MenuItemProps) {
  const { title, href, icon, hidden } = item;

  if (hidden) return null;

  let _iconLookup: IconLookup;

  if (_.isString(icon)) _iconLookup = parse.icon(icon);
  else _iconLookup = icon;

  const applyActiveStyle =
    typeof isActive === "function" ? isActive() : !!isActive;

  const underlineStyle =
    "after:block after:absolute after:bottom-[-0.2em] after:h-[0.1em] after:inset-x-0 after:w-full after:bg-current after:rounded-[4px] after:origin-center";

  const classValue = clsx(
    "hover:text-red-500",
    applyActiveStyle && [activeClass]
  );

  const innerClassValue = clsx(
    "relative inline-flex gap-1 items-center",
    underlineStyle,
    !applyActiveStyle &&
      "hover:after:scale-x-100 after:scale-x-0 after:transition-all"
  );

  return (
    <a href={href} data-active={applyActiveStyle} className={classValue}>
      <span className={innerClassValue}>
        <FontAwesomeIcon
          icon={_iconLookup}
          fixedWidth
          size="sm"
          className=" opacity-60"
        />
        <span className="font-semibold">{title}</span>
      </span>
    </a>
  );
}

const navItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
