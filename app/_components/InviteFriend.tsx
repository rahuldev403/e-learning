"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const InviteFriend = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendInvite = async () => {
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/invite/send", { email });
      toast.success("Invitation sent successfully! 🎉");
      setEmail("");
    } catch (error: any) {
      console.error("Failed to send invite:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to send invitation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendInvite();
    }
  };

  return (
    <div className="mt-6 sm:mt-8 p-3 sm:p-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 font-comfortaa">
        Invite Friend
      </h2>
      <p className="font-comfortaa font-bold text-sm sm:text-base">
        Having Fun? Share the love with a friend ! Enter an email we will send
        them the mail.
      </p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-2 mt-2">
        <input
          type="email"
          placeholder="Friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="border border-gray-700 w-full sm:w-[60%] md:w-[40%] lg:w-[30%] rounded-md p-2 font-comfortaa text-sm sm:text-base bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <Button
          variant={"pixel"}
          onClick={handleSendInvite}
          disabled={loading}
          className=" bg-blue-500 text-white  rounded-md font-comfortaa font-bold hover:text-gray-600 text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Invite"}
        </Button>
      </div>
    </div>
  );
};

export default InviteFriend;
