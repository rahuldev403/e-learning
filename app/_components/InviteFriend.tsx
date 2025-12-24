import { Button } from "@/components/ui/button";
import React from "react";

const InviteFriend = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 font-comfortaa">Invite Friend</h2>
      <p className="font-comfortaa font-bold">
        Having Fun? Share the love with a friend ! Enter an email we will send
        them the mail.
      </p>
      <div className="flex items-center gap-2 p-2 mt-2">
        <input
          type="email"
          placeholder="Friend's email"
          className="border border-gray-700 w-[30%] rounded-md p-1 font-comfortaa"
        />
        <Button
          variant={"pixel"}
          className=" bg-blue-500 text-white  rounded-md font-comfortaa font-bold hover:text-gray-600"
        >
          Send Invite
        </Button>
      </div>
    </div>
  );
};

export default InviteFriend;
