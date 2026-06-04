import { createFileRoute, Link } from "@tanstack/react-router";
import { FileWarning } from "lucide-react";
import { getCompanyByToken } from "@/lib/companies";
import { getBriefing } from "@/lib/api/briefings.functions";
import { BriefingForm } from "@/components/briefing/BriefingForm";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/briefing/$token")({
  head: () => ({
    meta: [{ title: "Briefing del proyecto" }],
  }),
  loader: async ({ params }) => {
    const company = getCompanyByToken(params.token);
    if (!company) return { company: null, data: null };
    const data = await getBriefing({ data: { token: params.token } });
    return { company, data };
  },
  component: Page,
});

function Page() {
  const { company, data } = Route.useLoaderData();
  const { t } = useLang();
  const f = t.form;

  if (!company || !data) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-muted text-muted-foreground">
          <FileWarning className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-xl font-bold">{f.invalidLink}</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">{f.invalidText}</p>
        <Link to="/" className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-[13.5px] font-medium text-primary-foreground hover:opacity-90">
          {f.goHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BriefingForm company={company} initialAnswers={data.answers} initialSubmitted={data.submitted} />
    </div>
  );
}
