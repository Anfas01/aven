"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import CartButton from "./CartButton";

interface Props {
  cartCount: number;
}

export default function Navbar({ cartCount }: Props) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 8);
    };

    handler();

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const accountActive = pathname.startsWith("/account");

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Aven"
            width={44}
            height={44}
            priority
          />

          <span className="text-2xl font-semibold tracking-tight">
            Aven
          </span>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <CartButton totalItems={cartCount} />

          {/* Account Button */}
          <Link
            href="/account"
            className={`hidden lg:inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
              accountActive
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Account</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-zinc-200 p-2 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={open}
        close={() => setOpen(false)}
      />
    </header>
  );
}