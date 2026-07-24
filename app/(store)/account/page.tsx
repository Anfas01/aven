import Link from "next/link";
import logout from "@/actions/authActions/logout";

const isLoggedIn = true;

const user = {
  name: "John Doe",
  email: "john@example.com",
};

export default function AccountPage() {

  if (!isLoggedIn) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center px-6">
        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-3xl">
            👤
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Welcome
          </h1>

          <p className="mt-3 text-zinc-500">
            Sign in to manage your account, view your
            orders and checkout faster.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              href="/login"
              className="block rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="block rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-2xl font-semibold text-white">
            {user.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {user.name}
            </h1>

            <p className="mt-1 text-zinc-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="my-8 h-px bg-zinc-200" />

        <div className="space-y-3">
          <Link
            href="/orders"
            className="flex items-center justify-between rounded-2xl border border-zinc-200 px-5 py-4 transition hover:border-zinc-900"
          >
            <span>My Orders</span>

            <span>→</span>
          </Link>

          <Link
            href="/profile"
            className="flex items-center justify-between rounded-2xl border border-zinc-200 px-5 py-4 transition hover:border-zinc-900"
          >
            <span>Edit Profile</span>

            <span>→</span>
          </Link>
        </div>

        <button onClick={logout}
          className="mt-8 w-full rounded-full border border-red-200 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
          Logout
        </button>
      </div>
    </main>
  );
}