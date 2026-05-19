import { getAllMediaItems } from "@/lib/media/manifests";
import { ViewerPageClient } from "@/app/viewer/[mediaId]/ViewerPageClient";

export function generateStaticParams() {
  return getAllMediaItems().map((item) => ({ mediaId: item.id }));
}

type Props = {
  params: Promise<{ mediaId: string }>;
};

export default async function ViewerPage({ params }: Props) {
  const { mediaId } = await params;
  return <ViewerPageClient mediaId={decodeURIComponent(mediaId)} />;
}
