"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ExploreCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

const exploreCards: ExploreCard[] = [
  {
    id: 1,
    title: "Interactive Coding",
    description:
      "Learn by doing with hands-on coding exercises and real-time feedback",
    image: "/placeholder1.png",
  },
  {
    id: 2,
    title: "Project Based",
    description:
      "Build real-world projects while learning new concepts and technologies",
    image: "/placeholder2.png",
  },
  {
    id: 3,
    title: "Expert Guidance",
    description:
      "Get support from experienced developers and comprehensive tutorials",
    image: "/placeholder3.png",
  },
  {
    id: 4,
    title: "Track Progress",
    description:
      "Monitor your learning journey with detailed analytics and achievements",
    image: "/placeholder4.png",
  },
];

const ExploreMore = () => {
  return (
    <div className="w-full py-12 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold font-game text-center mb-3 text-black">
          Explore More
        </h2>
        <p className="text-center text-gray-400 mb-8 font-game text-base">
          Discover what makes our platform special
        </p>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {exploreCards.map((card) => (
              <CarouselItem key={card.id}>
            <Card
              className="bg-white border-4 border-gray-800"
              style={{ imageRendering: "pixelated" }}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-[auto_1fr] gap-6 items-center">
                  <div className="shrink-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={120}
                  height={120}
                  className="border-4 border-gray-800"
                  style={{ imageRendering: "pixelated" }}
                />
                  </div>
                  <div className="flex flex-col gap-2">
                <CardTitle className="font-game text-2xl text-black">
                  {card.title}
                </CardTitle>
                <CardDescription className="font-game text-base text-gray-700">
                  {card.description}
                </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="pixel" />
          <CarouselNext variant="pixel" />
        </Carousel>
      </div>
    </div>
  );
};

export default ExploreMore;
