import CryptoJS from "crypto-js";

export const createSignature = (
  total_amount: string,
  transaction_uuid: string,
  product_code: string
) => {
  const secret = process.env.ESEWA_SECRET_KEY as string;

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const hash = CryptoJS.HmacSHA256(message, secret);

  return CryptoJS.enc.Base64.stringify(hash);
};