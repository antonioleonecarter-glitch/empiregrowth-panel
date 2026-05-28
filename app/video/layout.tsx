export const dynamic = "force-dynamic";

import { requireAcceso } from "@/lib/acceso";

export default async function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAcceso();
  return <>{children}</>;
}
