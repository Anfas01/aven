"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";


export default function DesktopNav() {

  const pathname = usePathname();


  const isActive = (href:string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);


  return (
    <nav className="hidden items-center gap-10 lg:flex">

      {navLinks.map((link)=>(
        <Link
          key={link.href}
          href={link.href}
          className={`relative text-sm font-medium transition-colors ${
            isActive(link.href)
            ? "text-zinc-900"
            : "text-zinc-500 hover:text-zinc-900"
          }`}
        >

          {link.name}


          <span
          className={`absolute -bottom-2 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-zinc-900 transition-all ${
            isActive(link.href)
            ? "w-full"
            : "w-0"
          }`}
          />

        </Link>
      ))}

    </nav>
  );
}