import Link from "next/link";
import { getAssociateBySlug } from "@/lib/associates";
import { OpportunityContent } from "@/components/opportunity-content";

export default async function AssociateOpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const associate = await getAssociateBySlug(slug);

  if (!associate) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="text-2xl font-bold">Link Not Found</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This personal link doesn&apos;t exist yet. Double check the URL, or create your own at{" "}
          <Link href="/join" className="text-primary underline">
            /join
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <OpportunityContent
      associateName={associate.name}
      associatePhone={associate.phone}
      customStory={associate.story || defaultStoryFallback}
      vipHref={`/vip/${associate.slug}`}
    />
  );
}

const defaultStoryFallback = `I started this business because I wanted more control over my time and income — and I've stuck with it because of the people I get to help along the way. If you're curious what that could look like for you, I'd love to talk.`;
