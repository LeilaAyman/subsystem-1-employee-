"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { performanceApi } from "@/app/utils/performanceApi";
import { useAuth } from "@/app/(system)/context/authContext";
import { AppraisalDisputeStatus } from "@/app/types/performance";

export default function ApproveDisputePage() {
  const { disputeId } = useParams<{ disputeId: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [summary, setSummary] = useState("Approved by HR");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onApprove = async () => {
    setLoading(true);
    setErr(null);

    try {
      // Prefer real Mongo _id if present; otherwise omit this field entirely
      const resolverId =
        (user as any)?._id ||
        (user as any)?.id ||
        (user as any)?.employeeProfileId?._id;

      const payload: any = {
        status: AppraisalDisputeStatus.ADJUSTED,
        resolutionSummary: summary,
      };

      // Only include if it looks like a real id
      if (typeof resolverId === "string" && resolverId.length >= 20) {
        payload.resolvedByEmployeeId = resolverId;
      }

      await performanceApi.updateDisputeStatus(disputeId, payload);

      router.push(`/performance/adminDisputes/${disputeId}`);
    } catch (e: any) {
      console.error("Approve dispute failed:", e);
      setErr(e?.response?.data?.message || e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Approve Dispute</h1>

      <textarea
        className="w-full border rounded-md p-3"
        rows={4}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        onClick={onApprove}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-60"
      >
        {loading ? "Approving..." : "Confirm Approve"}
      </button>
    </div>
  );
}
