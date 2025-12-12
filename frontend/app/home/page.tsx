"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/ApiClient";
import Link from "next/link";
import { isHRAdmin, isManager } from "@/app/utils/roleCheck";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/employee-profile/me");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const userIsHR = isHRAdmin(user);
  const userIsManager = isManager(user);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Welcome, {user?.firstName}!</h1>
          <p className="text-neutral-400 mt-1">Employee Management System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Profile */}
          <Link
            href="/profile"
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition group"
          >
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neutral-300">
              My Profile
            </h3>
            <p className="text-neutral-400 text-sm">
              View and update your personal information
            </p>
          </Link>

          {/* Team - For Managers */}
          {userIsManager && (
            <Link
              href="/team"
              className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition group"
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neutral-300">
                My Team
              </h3>
              <p className="text-neutral-400 text-sm">
                View and manage your team members
              </p>
            </Link>
          )}

          {/* HR Admin - For HR */}
          {userIsHR && (
            <Link
              href="/hr-admin"
              className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition group"
            >
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neutral-300">
                HR Administration
              </h3>
              <p className="text-neutral-400 text-sm">
                Manage all employee profiles and data
              </p>
            </Link>
          )}

          {/* Change Requests - For HR */}
          {userIsHR && (
            <Link
              href="/change-requests"
              className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition group"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neutral-300">
                Change Requests
              </h3>
              <p className="text-neutral-400 text-sm">
                Review and approve employee profile changes
              </p>
            </Link>
          )}

          {/* Profile Change Request */}
          <Link
            href="/profile/change-request"
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition group"
          >
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neutral-300">
              Request Changes
            </h3>
            <p className="text-neutral-400 text-sm">
              Submit a request to update your profile information
            </p>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-neutral-400">Employee Number:</span>
              <span className="text-white ml-2">{user?.employeeNumber}</span>
            </div>
            <div>
              <span className="text-neutral-400">Email:</span>
              <span className="text-white ml-2">{user?.workEmail || user?.email}</span>
            </div>
            <div>
              <span className="text-neutral-400">Status:</span>
              <span className="text-white ml-2">{user?.status}</span>
            </div>
            <div>
              <span className="text-neutral-400">Roles:</span>
              <span className="text-white ml-2">
                {user?.systemRoles && user.systemRoles.length > 0
                  ? user.systemRoles
                      .map((r: any) => r.roles || r.roleName || r)
                      .flat()
                      .join(", ")
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
