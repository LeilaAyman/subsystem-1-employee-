"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/ApiClient";

export default function OrganizationHierarchyPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // FETCH ORGANIZATION HIERARCHY
  // ============================
  const fetchHierarchy = async () => {
    try {
      const res = await axiosInstance.get(
        "/organization-structure/hierarchy/organization"
      );

      setDepartments(res.data.departments || []);
      setPositions(res.data.positions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load organization hierarchy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHierarchy();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading organization hierarchy...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Organization Hierarchy</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        departments.map((dept: any) => {
          const deptPositions = positions.filter(
            (pos: any) => pos.departmentId?._id === dept._id
          );

          return (
            <div key={dept._id} style={{ marginTop: 30 }}>
              {/* DEPARTMENT NAME */}
              <h2 style={{ marginBottom: 10 }}>
                📁 {dept.name}
              </h2>

              {/* POSITIONS UNDER DEPARTMENT */}
              {deptPositions.length === 0 ? (
                <p style={{ marginLeft: 20, fontStyle: "italic" }}>
                  No positions in this department
                </p>
              ) : (
                <ul style={{ marginLeft: 30 }}>
                  {deptPositions.map((pos: any) => (
                    <li key={pos._id}>
                      {pos.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
