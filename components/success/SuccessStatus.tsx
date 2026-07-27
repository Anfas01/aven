import {
  CheckCircle2,
  Mail,
  PackageCheck,
} from "lucide-react";

export default function SuccessStatus() {
  return (
    <section className="rounded-2rem border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Order Status
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          Everything looks good
        </h2>

        <p className="mt-3 max-w-2xl text-zinc-500">
          Your order has been successfully placed. We&apos;re now preparing it for
          shipment and will keep you updated throughout the process.
        </p>
      </div>

      <div className="space-y-4">
        {/* Payment */}
        <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              Payment received
            </h3>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              We&apos;ve successfully received your payment and your order has been
              confirmed.
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100">
            <Mail className="h-5 w-5 text-sky-600" />
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              Confirmation email sent
            </h3>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              A confirmation email with your order details is on its way to your
              inbox.
            </p>
          </div>
        </div>

        {/* Shipment */}
        <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <PackageCheck className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              Preparing your order
            </h3>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Our team is carefully preparing your items. You&apos;ll receive another
              update once your order has shipped.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}