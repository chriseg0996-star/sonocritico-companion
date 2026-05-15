import { redirect } from "next/navigation";
import { getModuleSlugForProtocol } from "@/lib/course-modules";

export default async function ProtocolRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const moduleSlug = getModuleSlugForProtocol(slug);
  if (moduleSlug) {
    redirect(`/modulos/${moduleSlug}?tab=protocolo`);
  }
  redirect("/modulos");
}
