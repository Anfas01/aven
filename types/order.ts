export interface OrderItemData {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderData {
  _id: string;

  userId: string;

  orderNumber: string;

  subtotal: number;

  paymentStatus:
    | "paid"
    | "pending"
    | "failed"
    | "refunded";

  orderStatus:
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  stripeSessionId: string;

  stripePaymentIntentId: string;

  shippingName: string;

  shippingEmail: string;

  shippingPhone: string;

  shippingAddress: {
    line1: string;
    line2?: string;

    city: string;

    state: string;

    postalCode: string;

    country: string;
  };

  createdAt: string;

  updatedAt: string;

  items: OrderItemData[];
}