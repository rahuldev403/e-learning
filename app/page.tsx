"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Hero from "./_components/Hero";
import Description from "./_components/Description";
import Footer from "./_components/Footer";
import CourseList from "./_components/CourseList";
import { MonitorIcon } from "lucide-react";

const page = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsSmallDevice(window.innerWidth < 1024);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);

    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  // Show loading or nothing while checking auth
  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col  justify-center"
    >
      <Hero />
      <Description />
      <Footer />
    </motion.div>
  );
};

export default page;
