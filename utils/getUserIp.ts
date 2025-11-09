// utils/getUserIp.ts
import { headers } from "next/headers";

export async function getUserIp(): Promise<string | null> {
  const headersList = await headers();

  // Official Vercel header
  const forwardedFor = headersList.get("x-forwarded-for");

  // Netlify header
  const nfClientIp = headersList.get("x-nf-client-connection-ip");

  // Cloudflare header
  const cfConnectingIp = headersList.get("cf-connecting-ip");

  let ip = "127.0.0.1"; // Default for local development

  if (forwardedFor) {
    // x-forwarded-for can be a comma-separated list, the first is the client
    ip = forwardedFor.split(",")[0].trim();
  } else if (nfClientIp) {
    ip = nfClientIp;
  } else if (cfConnectingIp) {
    ip = cfConnectingIp;
  }

  // Basic validation to avoid storing invalid values
  if (ip === "::1") {
    return "127.0.0.1"; // Standardize localhost
  }

  return ip;
}
