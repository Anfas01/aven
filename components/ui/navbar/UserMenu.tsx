"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogOut, Package } from "lucide-react";

import logout from "@/actions/authActions/logout";

type UserMenuProps = {
  name: string;
  email: string;
};

export default function UserMenu({
  name,
  email,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  async function handleLogout() {
    setOpen(false);
    await logout();
  }

  return (
    <div
      ref={menuRef}
      className="relative hidden lg:block"
    >
      {/* Avatar */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="User menu"
        className="
          flex h-11 w-11 items-center justify-center
          rounded-full
          border border-zinc-200
          bg-black
          text-sm font-semibold uppercase text-white
          transition-all duration-300
          hover:scale-105
          hover:shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-zinc-300
        "
      >
        {name.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute right-0 top-14 w-80
          origin-top-right
          rounded-3xl
          border border-zinc-200
          bg-white
          p-6
          shadow-xl
          transition-all duration-200

          ${
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }
        `}
      >
        {/* User */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-xl font-semibold uppercase text-white">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold tracking-tight text-zinc-900">
              {name}
            </h3>

            <p className="truncate text-sm text-zinc-500">
              {email}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-zinc-200" />

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="
              flex w-full items-center justify-center gap-2
              rounded-full
              border border-zinc-200
              px-5 py-3
              text-sm font-medium text-zinc-900
              transition-all duration-300
              hover:border-zinc-900
              hover:bg-zinc-900
              hover:text-white
            "
          >
            <Package className="h-4 w-4" />
            View My Orders
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center justify-center gap-2
              rounded-full
              border border-red-200
              px-5 py-3
              text-sm font-medium text-red-600
              transition-all duration-300
              hover:border-red-600
              hover:bg-red-600
              hover:text-white
            "
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}