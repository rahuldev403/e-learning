"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Enrolledcourses from "@/app/_components/Enrolledcourses";
import ExploreMore from "@/app/_components/ExploreMore";
import InviteFriend from "@/app/_components/InviteFriend";
import UpgradeToPro from "@/app/_components/UpgradeToPro";
import UserStatus from "@/app/_components/UserStatus";
import Welcomebanner from "@/app/_components/Welcomebanner";
import axios from "axios";
import { MonitorIcon } from "lucide-react";

interface DashboardData {
  enrolledCourses: any[];
  stats: {
    coursesEnrolled: number;
    projectsCompleted: number;
    certificatesEarned: number;
    hoursLearned: number;
  };
}

const Page = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsSmallDevice(window.innerWidth < 1024);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isSmallDevice) {
    return (
      <div className="h-[calc(100vh-73px)] w-full flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md text-center border-4 border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
          <MonitorIcon className="w-20 h-20 mx-auto mb-6 text-blue-600" />
          <h2 className="font-game text-2xl mb-4 text-gray-900 dark:text-white">
            [!] Desktop Required
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Go to a bigger screen to enjoy the{" "}
            <span className="font-game text-blue-600 dark:text-blue-400">
              next gen - coding adventure
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Please access this page from a desktop or laptop computer (minimum
            1024px width).
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white border-2 border-black font-game shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all"
          >
            [←] Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <Welcomebanner />
            <Enrolledcourses
              enrolledCourses={dashboardData?.enrolledCourses || []}
              loading={loading}
            />
            <ExploreMore />
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 border-2 items-center border-gray-600 p-3 sm:p-4 rounded-lg">
            <UserStatus stats={dashboardData?.stats} loading={loading} />
            <UpgradeToPro />
          </div>
        </div>

        <InviteFriend />
      </div>
    </div>
  );
};

export default Page;
