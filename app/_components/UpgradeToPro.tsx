import { Button } from "@/components/ui/button";
import crown from "@/public/crown.png";
import Image from "next/image";
const UpgradeToPro = () => {
  return (
    <div
      className="flex flex-col justify-center items-center border-4 border-black p-6  rounded-lg shadow-2xl bg-yellow-400/20"
      style={{
        imageRendering: "pixelated",
        borderImage:
          "repeating-linear-gradient(90deg, #000 0, #000 4px, transparent 4px, transparent 8px) 4",
      }}
    >
      <Image src={crown} alt="Crown" width={50} height={50} />
      <h2 className=" font-bold mt-4 font-comfortaa">Upgrade to Pro</h2>
      <h5 className="font-comfortaa font-bold text-center mb-2">
        join membership and get all course access
      </h5>
      <Button variant={"pixel"} size="lg" className="font-game font-bold">
        Upgrade Now
      </Button>
    </div>
  );
};

export default UpgradeToPro;
