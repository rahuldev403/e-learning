"use client";
import Enrolledcourses from "@/app/_components/Enrolledcourses";
import ExploreMore from "@/app/_components/ExploreMore";
import InviteFriend from "@/app/_components/InviteFriend";
import UpgradeToPro from "@/app/_components/UpgradeToPro";
import UserStatus from "@/app/_components/UserStatus";
import Welcomebanner from "@/app/_components/Welcomebanner";

const page = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Welcomebanner />
            <Enrolledcourses />
            <ExploreMore />
          </div>
          <div className="flex flex-col gap-6 border-2  items-center border-gray-600 p-4 rounded-lg">
            <UserStatus />
            <UpgradeToPro />
          </div>
        </div>

        <InviteFriend />
      </div>
    </div>
  );
};

export default page;
