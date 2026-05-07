import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { amount } = await req.json();
  const transactionUuid = `${Date.now()}-${uuidv4()}`;
  const productCode = process.env.NEXT_PUBLIC_ESEWA_PRODUCT_CODE!;
  const secretKey = process.env.ESEWA_SECRET_KEY!;
  const message = `total_amount=${amount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const signature = CryptoJS.enc.Base64.stringify(hash);
  return NextResponse.json({ transaction_uuid: transactionUuid, product_code: productCode, signature });
}