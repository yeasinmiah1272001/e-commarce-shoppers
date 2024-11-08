import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "../../../../type";

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const reqBody = await request.json();
    const { email, item } = reqBody;

    // Map items to Stripe's required format
    const extractingItems = item.map((product: Product) => ({
      quantity: product.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.title,
          description: product.description,
          // images: product.image ? [product.image] : [],
        },
      },
    }));
    const origin = request.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel/?canceled=true`,
      metadata: {
        email,
      },
    });

    return NextResponse.json(
      { url: session.url, sessionId: session.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Stripe error", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Stripe checkout session creation failed",
      },
      { status: 500 }
    );
  }
};
