// GoHighLevel V2 API — datos para el portal
import "server-only";
import { obtenerAccessToken } from "./ghl-oauth";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const DIAS_ES = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

export type LeadGHL = {
  id: string;
  nombre: string;
  iniciales: string;
  estado: string;
  cuando: string;
  color: "oro" | "cel" | "verde";
};

export type CitaGHL = {
  id: string;
  dia: string;
  fecha: string;
  mes: string;
  titulo: string;
  hora: string;
};

export type MetricasGHL = {
  leadsHoy: number;
  leads7Dias: number;
  citasAgendadas: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = Record<string, any>;

async function ghlFetch(path: string): Promise<unknown> {
  const auth = await obtenerAccessToken();
  if (!auth) return null;
  try {
    const res = await fetch(`${GHL_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Version: GHL_VERSION,
        "Content-Type": "application/json",
      },
      next: { revalidate: 120 },
    });
    if (!res.ok) {
      console.error(`[GHL] ${res.status} ${path} — ${await res.text().catch(() => "")}`);
      return null;
    }
    return res.json();
  } catch (e) {
    console.error("[GHL] red:", e);
    return null;
  }
}

function tiempoRelativo(iso?: string): string {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "ahora";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  if (diff < 172800) return "ayer";
  return `hace ${Math.floor(diff / 86400)}d`;
}

function iniciales(nombre: string): string {
  const p = nombre.trim().split(/\s+/);
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
  return (p[0][0] + p[p.length - 1][0]).toUpperCase();
}

const COLORES: LeadGHL["color"][] = ["oro", "cel", "verde"];

export async function obtenerLeads(limite = 5): Promise<LeadGHL[] | null> {
  const auth = await obtenerAccessToken();
  if (!auth) return null;

  const data = await ghlFetch(
    `/contacts/?locationId=${auth.locationId}&limit=${limite}&sortBy=dateAdded&sortDirection=desc`
  ) as { contacts?: Raw[] } | null;

  if (!data) return null;
  return (data.contacts ?? []).map((c, i) => {
    const nombre = [c.firstName, c.lastName].filter(Boolean).join(" ").trim() || "Sin nombre";
    return {
      id: String(c.id ?? i),
      nombre,
      iniciales: iniciales(nombre),
      estado: String(c.state || c.city || "—"),
      cuando: tiempoRelativo(c.dateAdded),
      color: COLORES[i % 3],
    };
  });
}

export async function obtenerMetricas(): Promise<MetricasGHL | null> {
  const auth = await obtenerAccessToken();
  if (!auth) return null;

  const dataC = await ghlFetch(
    `/contacts/?locationId=${auth.locationId}&limit=100&sortBy=dateAdded&sortDirection=desc`
  ) as { contacts?: Raw[] } | null;

  if (!dataC) return null;
  const contacts = dataC.contacts ?? [];

  const hoyInicio = new Date();
  hoyInicio.setHours(0, 0, 0, 0);
  const hace7 = new Date(Date.now() - 7 * 86_400_000);

  let leadsHoy = 0, leads7Dias = 0;
  for (const c of contacts) {
    const t = c.dateAdded ? new Date(c.dateAdded).getTime() : 0;
    if (t >= hoyInicio.getTime()) leadsHoy++;
    if (t >= hace7.getTime()) leads7Dias++;
  }

  const ahora = Date.now();
  const finSemana = ahora + 7 * 86_400_000;
  const dataE = await ghlFetch(
    `/calendars/events?locationId=${auth.locationId}&startTime=${ahora}&endTime=${finSemana}`
  ) as { events?: unknown[] } | null;

  return { leadsHoy, leads7Dias, citasAgendadas: dataE?.events?.length ?? 0 };
}

export async function obtenerCitas(): Promise<CitaGHL[] | null> {
  const auth = await obtenerAccessToken();
  if (!auth) return null;

  const ahora = Date.now();
  const finSemana = ahora + 7 * 86_400_000;
  const data = await ghlFetch(
    `/calendars/events?locationId=${auth.locationId}&startTime=${ahora}&endTime=${finSemana}`
  ) as { events?: Raw[] } | null;

  if (!data) return null;
  return (data.events ?? []).slice(0, 5).map((e) => {
    const d = new Date(typeof e.startTime === "number" ? e.startTime : (e.startTime ?? Date.now()));
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, "0");
    const hora12 = `${(h % 12) || 12}:${m} ${h >= 12 ? "PM" : "AM"}`;
    const titulo = String(e.title || e.contact?.name || "Cita");
    return {
      id: String(e.id ?? ""),
      dia: DIAS_ES[d.getDay()],
      fecha: String(d.getDate()),
      mes: d.toLocaleDateString("es-ES", { month: "short" }).toUpperCase().slice(0, 3),
      titulo,
      hora: hora12,
    };
  });
}
