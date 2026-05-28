import { guardarToken } from "@/lib/ghl-oauth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const TOKEN_URL = "https://services.leadconnectorhq.com/oauth/token";

function errorRedirect(req: NextRequest, detalle: string) {
  console.error("[GHL callback] ERROR:", detalle);
  return NextResponse.redirect(new URL("/inicio?ghl=error", req.url));
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const ghlError = req.nextUrl.searchParams.get("error");
  const ghlErrorDesc = req.nextUrl.searchParams.get("error_description");

  console.log("[GHL callback] Params:", Object.fromEntries(req.nextUrl.searchParams));

  if (ghlError) return errorRedirect(req, `GHL devolvió error: ${ghlError} — ${ghlErrorDesc}`);
  if (!code) return errorRedirect(req, "No llegó code en la query");

  const clientId = process.env.GHL_CLIENT_ID ?? "";
  const clientSecret = process.env.GHL_CLIENT_SECRET ?? "";
  const redirectUri = process.env.GHL_REDIRECT_URI ?? "";

  console.log("[GHL callback] CLIENT_ID:", clientId || "AUSENTE");
  console.log("[GHL callback] CLIENT_SECRET:", clientSecret ? `presente (${clientSecret.length} chars)` : "AUSENTE");
  console.log("[GHL callback] REDIRECT_URI:", redirectUri || "AUSENTE");
  console.log("[GHL callback] code:", code.slice(0, 24) + "...");

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    user_type: "Location",
    redirect_uri: redirectUri,
  });

  console.log("[GHL callback] POST", TOKEN_URL);
  console.log("[GHL callback] body (sin secret):", body.toString().replace(clientSecret, "***"));

  let tokenRes: Response;
  try {
    tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
  } catch (e) {
    return errorRedirect(req, `Error de red: ${e}`);
  }

  const rawBody = await tokenRes.text();
  console.log("[GHL callback] Token endpoint status:", tokenRes.status);
  console.log("[GHL callback] Token endpoint body:", rawBody);

  if (!tokenRes.ok) {
    return errorRedirect(req, `Token endpoint falló: ${tokenRes.status} — ${rawBody}`);
  }

  let data: { access_token: string; refresh_token: string; expires_in: number; locationId?: string };
  try {
    data = JSON.parse(rawBody);
  } catch {
    return errorRedirect(req, `Respuesta no es JSON válido: ${rawBody}`);
  }

  console.log("[GHL callback] locationId:", data.locationId);
  console.log("[GHL callback] expires_in:", data.expires_in);
  console.log("[GHL callback] access_token:", data.access_token ? "presente" : "AUSENTE");
  console.log("[GHL callback] refresh_token:", data.refresh_token ? "presente" : "AUSENTE");

  const locationId = data.locationId ?? "";
  await guardarToken(data, locationId);

  return NextResponse.redirect(new URL("/inicio?ghl=conectado", req.url));
}
