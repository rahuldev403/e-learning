import Image from "next/image";
import boy from "@/public/boy.gif";
import { useUser } from "@clerk/nextjs";

const stats = [
  { label: "Courses Enrolled", value: 12 },
  { label: "Projects Completed", value: 8 },
  { label: "Certificates Earned", value: 5 },
  { label: "Hours Learned", value: 120 },
];
const UserStatus = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex gap-4 items-center">
        <Image
          src={boy}
          alt="Boy Animation"
          width={40}
          height={40}
          className=" rounded-full"
        />
        <h2 className="font-game text-bold text-primary w-[80%] break-words overflow-hidden">
          {user?.primaryEmailAddress?.emailAddress}!
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-game text-2xl font-bold">Your Learning Stats</h2>
        <div className="grid grid-cols-2  gap-4 mt-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border-4 border-gray-800"
              style={{ imageRendering: "pixelated" }}
            >
              <h3 className="text-3xl font-bold font-game text-black">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-game">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
