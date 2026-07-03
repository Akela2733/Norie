import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ClearCart from "./ClearCart";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  if (sessionId) {
    // Attempt to update the order to 'paid' status
    // In a real app with webhooks, this would be handled securely in the background
    try {
      const order = await prisma.order.findFirst({
        where: { OR: [{ sessionId }, { id: sessionId.replace("simulated_", "") }] },
      });
      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "paid" },
        });
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-[#f0ece4] text-[#0a0a0a]">
      <ClearCart />
      <h1
        className="font-black uppercase text-4xl sm:text-6xl mb-6"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        THANK YOU FOR YOUR ORDER
      </h1>
      <p
        className="font-bold uppercase tracking-widest text-sm mb-12 opacity-60"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        YOUR ORDER HAS BEEN CONFIRMED.
      </p>
      <Link
        href="/"
        className="px-10 py-4 font-black uppercase text-sm tracking-widest transition-all cursor-pointer bg-[#0a0a0a] text-[#f0ece4] hover:scale-105"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
      >
        [ RETURN HOME ]
      </Link>
    </div>
  );
}
