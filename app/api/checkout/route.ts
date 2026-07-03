import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-06-24.dahlia" as any })
  : null;

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Create Order in Database
    const orderTotal = cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    let orderId = "fallback_" + Date.now();
    try {
      const order = await prisma.order.create({
        data: {
          total: orderTotal,
          items: {
            create: cart.map((item: any) => ({
              productId: item.id,
              size: item.size,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
      orderId = order.id;
    } catch (dbError) {
      console.warn("Could not create order in database (likely read-only on Vercel). Proceeding anyway:", dbError);
    }

    if (!stripe) {
      // Simulate checkout if no Stripe key is provided
      console.warn("No STRIPE_SECRET_KEY found, returning simulated checkout URL.");
      return NextResponse.json({
        url: `/checkout/success?session_id=simulated_${orderId}`,
      });
    }

    // Create Stripe Checkout Session
    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.name,
          images: [new URL(item.image, req.headers.get("origin") || "http://localhost:3000").toString()],
        },
        unit_amount: item.price * 100, // Stripe expects amounts in cents/smallest currency unit
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${req.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      metadata: {
        orderId: orderId,
      },
    });

    try {
      await prisma.order.update({
        where: { id: orderId },
        data: { sessionId: session.id },
      });
    } catch (dbError) {
      console.warn("Could not update order sessionId in database.", dbError);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout session creation failed" }, { status: 500 });
  }
}
