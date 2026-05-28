import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function requireAcceso() {
  const session = await getSession();
  if (!session.accesoOk) {
    redirect("/acceso");
  }
}
