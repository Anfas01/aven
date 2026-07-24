"use client";

import { Menu, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Orders",
      href: "/orders",
    },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="Aven"
            width={44}
            height={44}
            priority
            className="h-11 w-auto"
          />

          <span className="text-2xl font-semibold tracking-tight">
            Aven
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
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
                className={`absolute -bottom-2 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-zinc-900 transition-all duration-300 ${
                  isActive(link.href)
                    ? "w-full"
                    : "w-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <CartButton />

          <Link
            href="/account"
            className="hidden items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white lg:flex"
          >
            <User size={16} />
            Account
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-zinc-200 p-2 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white lg:hidden"
          >
            {open ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-zinc-200 bg-white transition-all duration-300 lg:hidden ${
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {[...navLinks, {
            name: "Account",
            href: "/account",
          }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}