// Script CLI · Crear un cliente nuevo manualmente tras el onboarding.
// Uso:
//   npm run cliente:nuevo -- --email="agente@ejemplo.com" --nombre="Antonio Leone" --password="cambiar123"

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Args = {
  email?: string;
  nombre?: string;
  password?: string;
};

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (const raw of argv) {
    const match = raw.match(/^--([a-zA-Z]+)=(.*)$/);
    if (!match) continue;
    const [, key, val] = match;
    if (key === "email" || key === "nombre" || key === "password") {
      args[key] = val.replace(/^"|"$/g, "");
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.email || !args.nombre || !args.password) {
    console.error(
      "\n⚠  Faltan argumentos.\n\n" +
        '   Uso: npm run cliente:nuevo -- --email="x@y.com" --nombre="Antonio Leone" --password="cambiar123"\n',
    );
    process.exit(1);
  }

  if (args.password.length < 8) {
    console.error("\n⚠  La contraseña debe tener al menos 8 caracteres.\n");
    process.exit(1);
  }

  const email = args.email.trim().toLowerCase();
  const existente = await prisma.cliente.findUnique({ where: { email } });
  if (existente) {
    console.error(`\n⚠  Ya existe un cliente con el correo ${email}.\n`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(args.password, 10);
  const cliente = await prisma.cliente.create({
    data: {
      email,
      nombre: args.nombre.trim(),
      passwordHash,
    },
  });

  console.log("\n✓  Cliente creado.\n");
  console.log("    id     :", cliente.id);
  console.log("    nombre :", cliente.nombre);
  console.log("    email  :", cliente.email);
  console.log("    creado :", cliente.creadoEn.toISOString());
  console.log("\n    Ya puede entrar en /login con su correo y contraseña.\n");
}

main()
  .catch((err) => {
    console.error("\n✗ Error:", err.message ?? err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
