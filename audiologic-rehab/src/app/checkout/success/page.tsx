import Link from "next/link";

type PageProps = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id: sessionId } = await searchParams;

  return (
    <div className="mx-auto max-w-[720px] px-6 sm:px-8 py-16 text-center">
      <h1 className="text-2xl font-semibold mb-2">Payment successful</h1>
      <p className="text-foreground/70 mb-6">
        Thank you for your purchase. We&apos;ve received your payment.
      </p>
      {sessionId && (
        <p className="text-sm text-foreground/60 mb-8">Checkout session: {sessionId}</p>
      )}
      <div className="space-x-3">
        <Link href="/services" className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors">
          Back to Services
        </Link>
        <Link href="/book" className="inline-flex items-center rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
          Schedule your appointment
        </Link>
      </div>
    </div>
  );
}


