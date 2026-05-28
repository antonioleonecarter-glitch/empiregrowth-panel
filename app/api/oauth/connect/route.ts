import { requireCliente } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  await requireCliente();

  const clientId = process.env.GHL_CLIENT_ID ?? "";
  const clientSecret = process.env.GHL_CLIENT_SECRET ?? "";
  const redirectUri = process.env.GHL_REDIRECT_URI ?? "";

  console.log("[GHL connect] CLIENT_ID:", clientId || "AUSENTE");
  console.log("[GHL connect] CLIENT_SECRET:", clientSecret ? `presente (${clientSecret.length} chars)` : "AUSENTE");
  console.log("[GHL connect] REDIRECT_URI:", redirectUri || "AUSENTE");

  const params = new URLSearchParams({
    response_type: "code",
    redirect_uri: redirectUri,
    client_id: clientId,
    scope: "contacts.readonly calendars.readonly locations.readonly",
  });

  const authUrl = `https://marketplace.gohighlevel.com/oauth/chooselocation?${params}`;
  console.log("[GHL connect] Redirigiendo a:", authUrl);

  return NextResponse.redirect(authUrl);
}
