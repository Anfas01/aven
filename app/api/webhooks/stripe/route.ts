import Stripe from "stripe";
import { headers } from "next/headers";

import stripe from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import Order from "@/models/orderModel";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing Stripe signature.", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);

    return new Response("Invalid signature.", {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      try {
        await connectDB();

        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id
        );

        const existingOrder = await Order.findOne({
          stripeSessionId: session.id,
        });

        if (existingOrder) {
          console.log("Order already exists");
          break;
        }

        const shipping = (
          session.collected_information as {
            shipping_details?: {
              name?: string;
              address?: {
                line1?: string;
                line2?: string | null;
                city?: string;
                state?: string;
                postal_code?: string;
                country?: string;
              };
            };
          } | null
        )?.shipping_details;

        const address = shipping?.address;

        const lineItems =
          await stripe.checkout.sessions.listLineItems(
            session.id,
            {
              expand: ["data.price.product"],
            }
          );

        const items = lineItems.data.map((item) => {
          let productId = "";
          let image = "";

          if (
            item.price?.product &&
            typeof item.price.product === "object" &&
            !("deleted" in item.price.product)
          ) {
            const product = item.price.product as Stripe.Product;

            productId = product.id;
            image = product.images?.[0] ?? "";
          }

          return {
            productId,
            name: item.description,
            image,
            price:
              (item.amount_total ?? 0) /
              (item.quantity ?? 1) /
              100,
            quantity: item.quantity ?? 1,
          };
        });

        await Order.create({
          userId: session.metadata?.userId ?? "",

          orderNumber: `ORD-${Date.now()}`,

          items,

          subtotal: (session.amount_total ?? 0) / 100,

          paymentStatus: "paid",

          orderStatus: "processing",

          stripeSessionId: session.id,

          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? "",

          shippingName:
            shipping?.name ??
            session.customer_details?.name ??
            "",

          shippingEmail:
            session.customer_details?.email ?? "",

          shippingPhone:
            session.customer_details?.phone ?? "",

          shippingAddress: {
            line1: address?.line1 ?? "",

            line2: address?.line2 ?? "",

            city: address?.city ?? "",

            state: address?.state ?? "",

            postalCode:
              address?.postal_code ?? "",

            country:
              address?.country ?? "",
          },
        });

        console.log("✅ Order created");
      } catch (error) {
        console.error("Error creating order:", error);
      }

      break;
    }

    default:
      console.log(
        `Unhandled event type: ${event.type}`
      );
  }

  return new Response("Webhook received.", {
    status: 200,
  });
}