"use client";

export default function CheckoutForm() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
        Shipping Details
      </h2>

      <p className="mt-2 text-sm text-zinc-500">
        Enter your shipping information below.
      </p>

      <div className="mt-8 grid gap-6">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+1 234 567 890"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Street Address
          </label>

          <input
            type="text"
            placeholder="123 Main Street"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        {/* City + State */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              City
            </label>

            <input
              type="text"
              placeholder="New York"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              State
            </label>

            <input
              type="text"
              placeholder="New York"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>
        </div>

        {/* ZIP + Country */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              ZIP Code
            </label>

            <input
              type="text"
              placeholder="10001"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Country
            </label>

            <input
              type="text"
              placeholder="United States"
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>
        </div>
      </div>
    </section>
  );
}