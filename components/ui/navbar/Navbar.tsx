"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, } from "lucide-react";
import { useEffect, useState } from "react";

import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";

interface Props {
  cartCount: number;
}

export default function Navbar({ cartCount }: Props) {

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 8);

      // Always show at the top
      if (currentScrollY < 10) {
        setVisible(true);
      }
      // Scrolling down
      else if (currentScrollY > lastScrollY) {
        setVisible(false);
      }
      // Scrolling up
      else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        border-b
        border-zinc-200/80
        bg-white/80
        backdrop-blur-xl
        transition-all
        duration-300
        ${visible
          ? "translate-y-0"
          : "-translate-y-full"
        }
        ${scrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
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

          <UserMenu
            name="zoro"
            email="zoro123@gmail.com"
          />

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-zinc-200 p-2 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        close={() => setOpen(false)}
        name="zoro"
        email="zoro123@gmail.com"
      />
    </header>
  );
}