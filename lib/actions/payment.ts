"use server";

import { createSignature } from "@/lib/esewa/esewa";

export async function initiateEsewaPayment(amount: number) {
  const transaction_uuid = Date.now().toString();

  const product_code =
    process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE!;

  const signature = createSignature(
    amount.toString(),
    transaction_uuid,
    product_code
  );

  return {
    amount,
    transaction_uuid,
    product_code,
    signature,
  };
}