import { headers } from "next/headers";

export async function getUserIp() {
  const headersList = await headers();
  const xForwardedFor = headersList.get("x-forwarded-for");

  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  return headersList.get("x-real-ip") || "127.0.0.1";
}
