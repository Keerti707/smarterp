type Props = {
  companyName?: string;
  state?: string;
  financialYear?: string;
};

export function DashboardHero({ companyName, state, financialYear }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-950/60 via-[#181424] to-[#B87333]/30 p-8 shadow-2xl shadow-black/30">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-[#B87333]/20 blur-3xl" />

      <div className="relative">
        <p className="mb-4 inline-flex rounded-full border border-[#F3C56B]/20 bg-[#F3C56B]/10 px-3 py-1 text-xs font-semibold text-[#F3C56B]">
          SmartERP Workspace
        </p>

        <h1 className="max-w-4xl text-5xl font-black tracking-tight">
          {companyName || "SmartERP Dashboard"}
        </h1>

        <p className="mt-3 text-gray-400">
          {state || "Company"} • FY {financialYear || "2026-27"} • Live business control center
        </p>
      </div>
    </section>
  );
}