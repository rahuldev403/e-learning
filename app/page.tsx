"use client";

import { useEffect, useState } from "react";
import Hero from "./_components/Hero";
import CourseList from "./_components/CourseList";
import { MonitorIcon } from "lucide-react";

const page = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsSmallDevice(window.innerWidth < 1024);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  return (
    <>
      <Hero />
      {isSmallDevice ? (
        <div className="w-full flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-2xl text-center border-4 border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]">
            <MonitorIcon className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="font-game text-xl sm:text-2xl mb-4 text-gray-900 dark:text-white">
              [!] Desktop Experience Recommended
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-comfortaa">
              Go to a bigger screen to enjoy the{" "}
              <span className="font-game text-purple-600 dark:text-purple-400">
                next gen - coding adventure
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Access from a desktop or laptop (minimum 1024px width) for the
              full experience
            </p>
          </div>
        </div>
      ) : (
        <CourseList />
      )}
    </>
  );
};

export default page;
