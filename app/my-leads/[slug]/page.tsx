import { MyLeadsGate } from "@/components/my-leads-gate";

export default async function MyLeadsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <MyLeadsGate slug={slug} />;
}
