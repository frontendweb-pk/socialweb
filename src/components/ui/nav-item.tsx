"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type NavitemProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    menu?: boolean;
  };
export default function NavItem({
  menu,
  href,
  children,
  className,
  ...rest
}: NavitemProps) {
  const pathname = usePathname();
  const clasess = clsx("", {
    "text-rose-600": pathname === href,
  });
  if (menu) {
    return (
      <li>
        <Link className={clasess} href={href} {...rest}>
          {children}
        </Link>
      </li>
    );
  }
  return (
    <Link className={clasess} href={href} {...rest}>
      {children}
    </Link>
  );
}
