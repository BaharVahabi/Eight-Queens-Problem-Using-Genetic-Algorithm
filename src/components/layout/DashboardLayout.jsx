export default function DashboardLayout({
  header,
  stats,
  board,
  sidebar,
  inspector,
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-10">
        {header}
        {stats}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-3xl border border-purple-100 bg-white p-4 shadow-xs sm:p-6">
            {board}
          </section>
          <aside className="flex flex-col gap-6">{sidebar}</aside>
        </div>

        {inspector}
      </div>
    </div>
  );
}