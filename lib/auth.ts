import "server-only";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getSession } from "./session";
import { prisma } from "./db";

const BCRYPT_ROUNDS = 10;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function getCurrentCliente() {
  const session = await getSession();
  if (!session.clienteId) return null;
  return prisma.cliente.findUnique({ where: { id: session.clienteId } });
}

export async function requireCliente() {
  const cliente = await getCurrentCliente();
  if (!cliente) {
    redirect("/login");
  }
  return cliente;
}
