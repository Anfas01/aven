import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-md">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Aven
            </h2>

            <p className="mt-5 leading-8 text-zinc-600">
              Premium essentials thoughtfully curated for modern living.
              Built with quality craftsmanship, timeless aesthetics,
              and a seamless shopping experience.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-900">
              Shop
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              <Link
                href="/products"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                Products
              </Link>

              <Link
                href="/cart"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                Cart
              </Link>

              <Link
                href="/checkout"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                Checkout
              </Link>

              <Link
                href="/orders"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                Orders
              </Link>
            </nav>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-900">
              Account
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              <Link
                href="/account"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                My Account
              </Link>

              <Link
                href="/login"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="text-zinc-600 transition hover:text-zinc-900"
              >
                Create Account
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 Aven. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com"
              className="transition hover:text-zinc-900"
            >
              GitHub
            </Link>

            <Link
              href="https://linkedin.com"
              className="transition hover:text-zinc-900"
            >
              LinkedIn
            </Link>

            <Link
              href="https://twitter.com"
              className="transition hover:text-zinc-900"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}