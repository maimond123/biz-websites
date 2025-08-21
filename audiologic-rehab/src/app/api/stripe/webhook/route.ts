import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is not set. Webhook will fail.");
}
if (!webhookSecret) {
  console.warn("STRIPE_WEBHOOK_SECRET is not set. Webhook verification will fail.");
}

const stripe = new Stripe(stripeSecretKey || "", { apiVersion: "2024-06-20" });

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!webhookSecret || !signature) {
    return new NextResponse("Missing webhook secret or signature", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        // const session = event.data.object as Stripe.Checkout.Session;
        // Optionally fetch line items and send email or trigger scheduling.
        // const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        // For Phase 1, we rely on Stripe dashboard receipts and the success page CTA.
        break;
      }
      case "payment_intent.payment_failed": {
        // Handle failures if desired
        break;
      }
      default: {
        // no-op for other events in v1
      }
    }
    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(`Handler Error: ${message}`, { status: 500 });
  }
}


