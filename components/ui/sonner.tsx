"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { cn } from "@/lib/utils";

const pixelClassNames = {
  toast:
    "pixel-toast pointer-events-auto w-full max-w-sm border-4 border-gray-900 bg-[#fff9d6] dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-none shadow-[6px_6px_0_0_#111] dark:shadow-[6px_6px_0_0_#fafafa] font-game text-sm tracking-wide",
  title: "text-base font-game uppercase text-gray-900 dark:text-gray-100",
  description:
    "text-xs font-mono text-gray-700 dark:text-gray-300 leading-snug",
  actionButton:
    "font-game uppercase bg-black text-white border-4 border-gray-900 rounded-none px-4 py-1 shadow-[3px_3px_0_0_#000] transition-transform duration-150 hover:-translate-y-0.5",
  cancelButton:
    "font-game uppercase bg-white text-gray-900 border-4 border-gray-900 rounded-none px-4 py-1 shadow-[3px_3px_0_0_#000] hover:bg-gray-100",
  closeButton:
    "border-2 border-gray-900 rounded-none bg-white text-gray-900 size-7 flex items-center justify-center shadow-[2px_2px_0_0_#000] hover:bg-gray-100",
  icon: "size-6 border-2 border-gray-900 rounded-none bg-black text-white p-1 shadow-[2px_2px_0_0_#000]",
} satisfies NonNullable<ToasterProps["toastOptions"]>["classNames"];

const Toaster = ({ className, toastOptions, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn(
        "toaster pointer-events-none [&>div]:pointer-events-auto",
        className
      )}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...pixelClassNames,
          ...toastOptions?.classNames,
          toast: cn(pixelClassNames.toast, toastOptions?.classNames?.toast),
          title: cn(pixelClassNames.title, toastOptions?.classNames?.title),
          description: cn(
            pixelClassNames.description,
            toastOptions?.classNames?.description
          ),
          actionButton: cn(
            pixelClassNames.actionButton,
            toastOptions?.classNames?.actionButton
          ),
          cancelButton: cn(
            pixelClassNames.cancelButton,
            toastOptions?.classNames?.cancelButton
          ),
          closeButton: cn(
            pixelClassNames.closeButton,
            toastOptions?.classNames?.closeButton
          ),
          icon: cn(pixelClassNames.icon, toastOptions?.classNames?.icon),
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
