// app/performance/adminDashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { performanceApi } from '@/app/utils/performanceApi';
import { useAuth } from '@/app/(system)/context/authContext';
import { PerformanceAnalytics } from '@/app/types/performance';
import {
  BarChart,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Settings,
  Download
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<PerformanceAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await performanceApi.getPerformanceAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-[#050816]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816]">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Performance Admin Dashboard
            </h1>
            <p className="text-gray-300 mt-1">
              Manage performance cycles, templates, and monitor evaluations
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-800 transition flex items-center gap-2"
            >
              Refresh
            </button>
            <Link href="/performance/analytics">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
                <Download size={16} />
                Export Reports
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Assignments */}
          <div className="bg-[#111827] border border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Total Assignments
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {analytics?.totalAssignments || 0}
                </p>
              </div>
              <div className="bg-blue-900/60 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-[#111827] border border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-green-400 mt-1">
                  {analytics?.completionRate || '0%'}
                </p>
              </div>
              <div className="bg-green-900/60 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-[#111827] border border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">
                  {analytics?.inProgressAssignments || 0}
                </p>
              </div>
              <div className="bg-yellow-900/60 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Average Score */}
          <div className="bg-[#111827] border border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-purple-400 mt-1">
                  {analytics?.averageScore || '0'}
                </p>
              </div>
              <div className="bg-purple-900/60 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#111827] border border-gray-700 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-900/60 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      New appraisal cycle created
                    </p>
                    <p className="text-sm text-gray-400">
                      Annual Review 2024
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  Today, 10:30 AM
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-900/60 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      5 evaluations completed
                    </p>
                    <p className="text-sm text-gray-400">
                      By Department Managers
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  Yesterday, 3:45 PM
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-900/60 p-2 rounded-full">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      New dispute raised
                    </p>
                    <p className="text-sm text-gray-400">
                      Requires HR review
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  2 days ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
