import "server-only";
import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  accesoOk?: boolean; // Puerta 1 — clave genérica validada
  clienteId?: number; // Puerta 2 — cliente identificado
  email?: string;
};

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? "",
  cookieName: "eg_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function getSession() {
  if (!sessionOptions.password) {
    throw new Error("SESSION_SECRET no está configurado en .env.local");
  }
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
