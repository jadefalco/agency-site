import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { checkAuth, logout } from "./actions";
import CopyPhone from "./CopyPhone";
import ConversationScroll from "./ConversationScroll";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="bg-white/5 border border-red-500/20 rounded-2xl p-8 w-full max-w-sm text-center">
          <h1 className="text-white text-xl font-semibold mb-3">
            Configuration Error
          </h1>
          <p className="text-red-300 text-sm">
            DASHBOARD_PASSWORD is not set. Please configure the environment variable to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!(await checkAuth())) {
    redirect("/dashboard/login");
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" } } },
    take: 100,
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    withPhoto: leads.filter((l) => l.photoUrl).length,
    awaitingResponse: leads.filter((l) => {
      if (l.step === "complete") return false;
      const lastMsg = l.messages[l.messages.length - 1];
      return lastMsg?.direction === "outbound";
    }).length,
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center text-sm font-bold">
              M
            </div>
            <h1 className="text-lg font-semibold">Missed-Call Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                {stats.total} total
              </span>
              <span className="px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal-300">
                {stats.qualified} qualified
              </span>
              {stats.awaitingResponse > 0 && (
                <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  {stats.awaitingResponse} awaiting reply
                </span>
              )}
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-5 md:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total Leads" value={stats.total} />
          <StatCard label="New" value={stats.new} />
          <StatCard label="Qualified" value={stats.qualified} />
          <StatCard label="With Photo" value={stats.withPhoto} />
        </div>
      </div>

      {/* Leads */}
      <div className="max-w-5xl mx-auto px-5 md:px-6 pb-16">
        {leads.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg mb-2">No leads yet</p>
            <p className="text-sm">When customers text your Twilio number, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => {
              const lastMsg = lead.messages[lead.messages.length - 1];
              const isAwaiting =
                lead.step !== "complete" && lastMsg?.direction === "outbound";

              return (
                <div
                  key={lead.id}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* Lead Header */}
                  <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold shrink-0">
                        {lead.customerName?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {lead.customerName || "Unknown"}
                        </p>
                        <p className="text-white/40 text-xs flex items-center">
                          {lead.phone}
                          <CopyPhone phone={lead.phone} />
                          <span className="mx-1">·</span>
                          {lead.createdAt.toLocaleString("en-CA", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {isAwaiting && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium animate-pulse">
                          Awaiting Response
                        </span>
                      )}
                      {lead.status === "qualified" && (
                        <span className="px-2.5 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal-300 text-xs font-medium">
                          Qualified
                        </span>
                      )}
                      {lead.status === "new" && (
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
                          New
                        </span>
                      )}
                      {lead.urgencyScore > 0 && (
                        <UrgencyBadge score={lead.urgencyScore} />
                      )}
                      {lead.issueType && (
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                          {lead.issueType}
                        </span>
                      )}
                      {lead.area && (
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                          {lead.area}
                        </span>
                      )}
                      {lead.photoUrl && (
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">
                          Photo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {lead.conversationSummary && (
                    <div className="px-5 md:px-6 pb-4">
                      <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                        <p className="text-white/30 text-xs font-medium uppercase tracking-wide mb-2">
                          Summary
                        </p>
                        <p className="text-white/70 text-sm whitespace-pre-line">
                          {lead.conversationSummary}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Photo */}
                  {lead.photoUrl && (
                    <div className="px-5 md:px-6 pb-4">
                      <a
                        href={lead.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <img
                          src={`/api/media/${lead.photoUrl.replace(
                            "https://api.twilio.com/",
                            ""
                          )}`}
                          alt="Customer upload"
                          className="w-48 h-48 object-cover"
                        />
                      </a>
                    </div>
                  )}

                  {/* Conversation */}
                  <div className="border-t border-white/5 px-5 md:px-6 py-4">
                    <p className="text-white/30 text-xs font-medium uppercase tracking-wide mb-3">
                      Conversation ({lead.messages.length} messages)
                    </p>
                    <ConversationScroll>
                      {lead.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.direction === "outbound"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                              msg.direction === "outbound"
                                ? "bg-brand-teal/20 text-brand-teal-100 rounded-br-md"
                                : "bg-white/5 text-white/80 rounded-bl-md"
                            }`}
                          >
                            <p>{msg.body}</p>
                            <p className="text-[10px] opacity-40 mt-1">
                              {msg.createdAt.toLocaleTimeString("en-CA", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </ConversationScroll>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-white/40 text-xs mt-1">{label}</p>
    </div>
  );
}

function UrgencyBadge({ score }: { score: number }) {
  if (score >= 50) {
    return (
      <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium">
        Emergency ({score})
      </span>
    );
  }
  if (score >= 25) {
    return (
      <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-medium">
        Medium ({score})
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-medium">
      Low ({score})
    </span>
  );
}
