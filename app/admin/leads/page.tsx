import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lead Dashboard | Missed-Call Recovery",
  robots: {
    index: false,
    follow: false,
  },
};

function getUrgencyBadge(score: number) {
  if (score >= 50) return "🔴 Emergency";
  if (score >= 25) return "🟡 Medium";
  return "🟢 Low";
}

function getUrgencyColor(score: number) {
  if (score >= 50) return "bg-red-100 text-red-800 border-red-200";
  if (score >= 25) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-green-100 text-green-800 border-green-200";
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    where: {
      OR: [{ status: "qualified" }, { step: "complete" }],
    },
    orderBy: [{ urgencyScore: "desc" }, { createdAt: "desc" }],
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Missed-Call Leads</h1>
            <p className="mt-1 text-gray-600">
              {leads.length} qualified lead{leads.length !== 1 ? "s" : ""} waiting for callback
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Auto-refreshes on load
          </div>
        </div>

        {leads.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-lg text-gray-500">No qualified leads yet.</p>
            <p className="mt-2 text-sm text-gray-400">
              When someone calls and completes the text flow, they will appear here.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getUrgencyColor(
                      lead.urgencyScore || 0
                    )}`}
                  >
                    {getUrgencyBadge(lead.urgencyScore || 0)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(lead.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <a
                  href={`tel:${lead.phone}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  📞 Call Back
                </a>
              </div>

              {/* Body */}
              <div className="grid gap-6 px-6 py-5 md:grid-cols-2">
                {/* Left: Collected Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Customer
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {lead.customerName || "Unknown"}
                    </p>
                    <p className="font-mono text-sm text-gray-600">{lead.phone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Issue
                      </h3>
                      <p className="mt-1 font-medium text-gray-900">
                        {lead.issueType || "—"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Area
                      </h3>
                      <p className="mt-1 font-medium text-gray-900">
                        {lead.area || "—"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Urgency
                      </h3>
                      <p className="mt-1 text-gray-900">{lead.urgency || "—"}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Duration
                      </h3>
                      <p className="mt-1 text-gray-900">{lead.timeframe || "—"}</p>
                    </div>
                  </div>

                  {(lead.symptoms || lead.attemptedFix) && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Details
                      </h3>
                      {lead.symptoms && (
                        <p className="mt-1 text-sm text-gray-700">
                          <span className="font-medium">Symptoms:</span> {lead.symptoms}
                        </p>
                      )}
                      {lead.attemptedFix && (
                        <p className="mt-1 text-sm text-gray-700">
                          <span className="font-medium">Tried:</span> {lead.attemptedFix}
                        </p>
                      )}
                    </div>
                  )}

                  {lead.photoUrl && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Photo
                      </h3>
                      <a
                        href={lead.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-sm text-blue-600 hover:underline"
                      >
                        View attached photo →
                      </a>
                    </div>
                  )}
                </div>

                {/* Right: Conversation */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Text Conversation
                  </h3>
                  <div className="space-y-3">
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
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            msg.direction === "outbound"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-800 shadow-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.body}</p>
                          <p
                            className={`mt-1 text-[10px] ${
                              msg.direction === "outbound"
                                ? "text-blue-100"
                                : "text-gray-400"
                            }`}
                          >
                            {msg.direction === "inbound" ? "Customer" : "You"} •{" "}
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/30 px-6 py-3">
                <p className="text-xs text-gray-400">
                  Lead ID: {lead.id.slice(0, 8)}…
                </p>
                <form action="/api/leads/mark-contacted" method="POST">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    ✓ Mark as Contacted
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}