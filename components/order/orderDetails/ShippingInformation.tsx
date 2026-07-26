import { MapPin, Mail, Phone, User } from "lucide-react";

type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Props = {
  order: {
    shippingName: string;
    shippingEmail: string;
    shippingPhone: string;
    shippingAddress: ShippingAddress;
  };
};

export default function ShippingInformation({
  order,
}: Props) {
  return (
    <section className="rounded-2rem border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100">
          <MapPin className="h-6 w-6 text-zinc-700" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Delivery
          </span>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Shipping Information
          </h2>
        </div>
      </div>

      {/* Content */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recipient */}

        <div className="rounded-1.5rem bg-zinc-50 p-6">
          <h3 className="mb-6 text-lg font-semibold text-zinc-900">
            Recipient
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-5 w-5 text-zinc-500" />

              <div>
                <p className="text-sm text-zinc-500">
                  Full Name
                </p>

                <p className="font-medium text-zinc-900">
                  {order.shippingName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-zinc-500" />

              <div>
                <p className="text-sm text-zinc-500">
                  Email
                </p>

                <p className="break-all font-medium text-zinc-900">
                  {order.shippingEmail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-zinc-500" />

              <div>
                <p className="text-sm text-zinc-500">
                  Phone
                </p>

                <p className="font-medium text-zinc-900">
                  {order.shippingPhone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}

        <div className="rounded-1.5rem bg-zinc-50 p-6">
          <h3 className="mb-6 text-lg font-semibold text-zinc-900">
            Delivery Address
          </h3>

          <div className="space-y-3 leading-7 text-zinc-700">
            <p>{order.shippingAddress.line1}</p>

            {order.shippingAddress.line2 && (
              <p>{order.shippingAddress.line2}</p>
            )}

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>

            <p>{order.shippingAddress.postalCode}</p>

            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>
    </section>
  );
}