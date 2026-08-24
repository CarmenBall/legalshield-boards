import { getAssociateBySlug } from "@/lib/associates";
import { VipForm } from "@/components/vip-form";

export default async function AssociateVipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const associate = await getAssociateBySlug(slug);

  if (!associate) {
    return <VipForm notFound />;
  }

  return <VipForm associateName={associate.name} associateSlug={associate.slug} />;
}
