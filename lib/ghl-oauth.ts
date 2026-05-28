// GoHighLevel OAuth 2.0 — gestión de tokens
import "server-only";
import { prisma } from "./db";

const TOKEN_URL = "https://services.leadconnectorhq.com/oauth/token";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  locationId?: string;
};

function credenciales() {
  return {
    client_id: process.env.GHL_CLIENT_ID ?? "",
    client_secret: process.env.GHL_CLIENT_SECRET ?? "",
  };
}

async function postToken(params: Record<string, string>): Promise<TokenResponse | null> {
  const body = new URLSearchParams({ ...credenciales(), user_type: "Location", ...params });
  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[GHL OAuth] token error:", res.status, await res.text().catch(() => ""));
      return null;
    }
    return res.json() as Promise<TokenResponse>;
  } catch (e) {
    console.error("[GHL OAuth] network error:", e);
    return null;
  }
}

export async function intercambiarCodigo(code: string): Promise<TokenResponse | null> {
  return postToken({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.GHL_REDIRECT_URI ?? "",
  });
}

export async function guardarToken(data: TokenResponse, locationId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + (data.expires_in - 300) * 1000);
  try {
    await prisma.tokenGHL.upsert({
      where: { id: 1 },
      create: { id: 1, accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt, locationId },
      update: { accessToken: data.access_token, refreshToken: data.refresh_token, expiresAt, locationId },
    });
  } catch (e) {
    console.error("[GHL OAuth] guardarToken error:", e);
  }
}

export async function obtenerAccessToken(): Promise<{ token: string; locationId: string } | null> {
  try {
    const stored = await prisma.tokenGHL.findUnique({ where: { id: 1 } });
    if (!stored) return null;

    if (stored.expiresAt > new Date()) {
      return { token: stored.accessToken, locationId: stored.locationId };
    }

    // Token expirado — refresca
    const fresh = await postToken({ grant_type: "refresh_token", refresh_token: stored.refreshToken });
    if (!fresh) return null;
    await guardarToken(fresh, stored.locationId);
    return { token: fresh.access_token, locationId: stored.locationId };
  } catch (e) {
    console.error("[GHL OAuth] obtenerAccessToken error:", e);
    return null;
  }
}

export async function ghlConectado(): Promise<boolean> {
  try {
    const stored = await prisma.tokenGHL.findUnique({ where: { id: 1 } });
    return !!stored;
  } catch (e) {
    console.error("[GHL OAuth] ghlConectado error:", e);
    return false;
  }
}
