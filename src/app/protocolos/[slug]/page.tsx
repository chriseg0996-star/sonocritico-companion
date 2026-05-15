import { redirect } from "next/navigation";
import { protocols } from "@/lib/mock-data";
import { getModuleSlugForProtocol } from "@/lib/course-modules";

export function generateStaticParams() {
  return protocols.map((p) => ({ slug: p.slug }));
}

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
