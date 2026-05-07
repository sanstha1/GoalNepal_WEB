import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const amountStr = String(amount);
    const transactionUuid = `${Date.now()}`;
    const productCode = "EPAYTEST";
    const secretKey = "8gBm/:&EnhH.1/q";
    const message = `total_amount=${amountStr},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    const signature = crypto.createHmac("sha256", secretKey).update(message).digest("base64");

    console.log("=== ESEWA DEBUG ===");
    console.log("message:", message);
    console.log("signature:", signature);

    return NextResponse.json({ transaction_uuid: transactionUuid, product_code: productCode, signature, amount: amountStr });
  } catch (err) {
    console.error("eSewa route error:", err);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}