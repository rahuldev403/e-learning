import { MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommunityHelpProps {
  courseId: string;
}

export const CommunityHelp = ({ }: CommunityHelpProps) => {
  return (
    <Card className="bg-gray-100 dark:bg-gray-800 border-4 border-gray-800  rounded-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
          <CardTitle className="text-base sm:text-lg md:text-xl font-game font-normal">
            Ask Question in Community
          </CardTitle>
        </div>
        <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
          <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-black dark:text-white" />
          Need help? Get answers from fellow learners
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <p className="text-xs sm:text-sm text-muted-foreground font-comfortaa">
          Join our community to ask questions, share insights, and connect with
          other students taking this course.
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block w-full">
              <Button
                className="w-full font-game font-normal rounded-md text-xs sm:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed pointer-events-none"
                variant={"pixel"}
                disabled
              >
                Go to Community
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Coming Soon</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
};
