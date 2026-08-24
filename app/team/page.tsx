import { headers } from "next/headers";
import Link from "next/link";
import { listAssociates } from "@/lib/associates";
import { TeamList } from "@/components/team-list";
import { Button } from "@/components/ui/button";
import { Shield, Plus } from "lucide-react";

export default async function TeamPage() {
  const associates = await listAssociates();
  const headersList = await headers();
  const host = headersList.get("host") || "legalshield-boards.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground">LegalShield</span>
          </div>
          <Button size="sm" asChild className="gap-1.5">
            <Link href="/join">
              <Plus className="h-3.5 w-3.5" /> Get My Link
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-6 px-6 py-10">
        <div>
          <h1 className="text-2xl font-bold">Team Links</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every associate&apos;s personal Opportunity Page and VIP Form. Leads submitted through each link are tagged with that
            person&apos;s name automatically.
          </p>
        </div>
        <TeamList associates={associates} origin={origin} />
      </div>
    </div>
  );
}
