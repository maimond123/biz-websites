import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { services } from "@/data/services";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appBaseUrl = process.env.APP_BASE_URL;

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is not set. Checkout creation will fail at runtime.");
}
if (!appBaseUrl) {
  console.warn("APP_BASE_URL is not set. Success/cancel URLs will be invalid.");
}

const stripe = new Stripe(stripeSecretKey || "", { apiVersion: "2024-06-20" });

// In v1 we reference amounts from our local catalog to create ad-hoc line items.
// For production, prefer using Price IDs configured in Stripe and store them in your catalog.

export async function POST(req: Request) {
  try {
    const hdrs = await headers();
    let inferredBaseUrl: string | undefined;
    try {
      const proto = hdrs.get('x-forwarded-proto') || 'http';
      const host = hdrs.get('host');
      inferredBaseUrl = host ? `${proto}://${host}` : undefined;
    } catch {
      inferredBaseUrl = undefined;
    }
    const baseUrl = appBaseUrl || inferredBaseUrl || "";
    const body = await req.json();
    const serviceSlug: string | undefined = body?.serviceId || body?.serviceSlug;
    if (!serviceSlug) {
      return NextResponse.json({ error: "Missing serviceId" }, { status: 400 });
    }

    const service = services.find((s) => s.slug === serviceSlug);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (service.priceCents === null) {
      // Free consult: no checkout required. Redirect caller to scheduling.
      return NextResponse.json({
        url: `${baseUrl}/book?service=${encodeURIComponent(service.slug)}`,
        free: true,
      });
    }

    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: service.title,
              description: `${service.durationMinutes} min • ${service.isGroup ? "Group" : "Individual"}`,
            },
            unit_amount: service.priceCents,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      client_reference_id: service.slug,
      metadata: {
        serviceSlug: service.slug,
        serviceTitle: service.title,
        durationMinutes: String(service.durationMinutes),
        isGroup: String(service.isGroup),
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


