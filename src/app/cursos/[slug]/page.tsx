import { CursoInscripcionPage, getAllCursoSlugs } from "@/features/cursos";

export function generateStaticParams() {
  return getAllCursoSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CursoPage({ params }: Props) {
  const { slug } = await params;
  return <CursoInscripcionPage slug={slug} />;
}
