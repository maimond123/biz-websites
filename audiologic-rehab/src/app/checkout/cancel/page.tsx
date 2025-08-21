import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 sm:px-8 py-16 text-center">
      <h1 className="text-2xl font-semibold mb-2">Checkout canceled</h1>
      <p className="text-foreground/70 mb-6">
        Your payment was not completed. You can resume checkout at any time.
      </p>
      <div className="space-x-3">
        <Link href="/services" className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors">
          Back to Services
        </Link>
      </div>
    </div>
  );
}


