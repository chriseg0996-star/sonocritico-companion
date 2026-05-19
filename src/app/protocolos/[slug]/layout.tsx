import { getInteractiveProtocolSlugs } from "@/lib/protocols";

export function generateStaticParams() {
  return getInteractiveProtocolSlugs().map((slug) => ({ slug }));
}

export default function ProtocoloSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
