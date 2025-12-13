"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/ApiClient";

export default function MyTeamHierarchyPage() {
  const [manager, setManager] = useState<any>(null);
  const [teamPositions, setTeamPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyTeam = async () => {
    try {
      const res = await axiosInstance.get(
        "/organization-structure/hierarchy/my-team"
      );

      setManager(res.data.manager);
      setTeamPositions(res.data.teamPositions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load team hierarchy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTeam();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading my team...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>My Team Hierarchy</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {manager && (
        <p style={{ marginTop: 10 }}>
          <strong>Manager:</strong> {manager.firstName} {manager.lastName}
        </p>
      )}

      <div style={{ marginTop: 30 }}>
        <h2>Team Members</h2>

        {teamPositions.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>
            No team members reporting to you.
          </p>
        ) : (
          <ul style={{ marginLeft: 20 }}>
            {teamPositions.map((pos: any) => (
              <li key={pos._id}>
                {pos.title}
                {pos.departmentId?.name && (
                  <span style={{ color: "#aaa" }}>
                    {" "}({pos.departmentId.name})
                  </span>
                )}
               <span style={{ color: "#888", marginLeft: 6 }}>
    → reports to {manager?.primaryPosition?.title || "Manager"}
  </span>
</li>
             
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
