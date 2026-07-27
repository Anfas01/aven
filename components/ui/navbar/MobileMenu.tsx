"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Package } from "lucide-react";

import logout from "@/actions/authActions/logout";
import { navLinks } from "./navLinks";

interface Props {
  open: boolean;
  close: () => void;
  name: string;
  email: string;
}

export default function MobileMenu({
  open,
  close,
  name,
  email,
}: Props) {
  const pathname = usePathname();

  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  async function handleLogout() {
    close();
    await logout();
  }

  return (
    <div
      className={`
        overflow-hidden border-t border-zinc-200 bg-white transition-all duration-300 lg:hidden
        ${
          open
            ? "max-h-700px opacity-100"
            : "max-h-0 opacity-0"
        }
      `}
    >
      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className={`
              rounded-xl px-4 py-3 text-sm font-medium transition-all
              ${
                active(link.href)
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-700 hover:bg-zinc-100"
              }
            `}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-zinc-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase text-white">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {name}
            </p>

            <p className="truncate text-xs text-zinc-500">
              {email}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 space-y-2">
          <Link
            href="/orders"
            onClick={close}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            <Package className="h-5 w-5" />
            View My Orders
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}