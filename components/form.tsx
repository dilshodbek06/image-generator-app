"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import CustomButton from "./custom-button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Type for category
type Category = {
  name: string;
  src: string;
};

// Type for prompts
type Prompts = {
  [key: string]: string[];
};

const prompts: Prompts = {
  nature: [
    "Create a serene forest scene at dawn with mist rising between tall pine trees.",
    "Design a peaceful beach with soft waves crashing on the shore under a colorful sunset.",
    "Show a tranquil meadow of wildflowers with a distant view of mountains.",
    "Generate a tropical jungle with vibrant green foliage and dappled sunlight breaking through.",
    "Depict a quiet river winding through a valley surrounded by lush greenery.",
    "Create a scene of a rainy day in a dense forest, with raindrops splashing on the leaves.",
    "Illustrate a snow-covered mountain range under a clear blue sky.",
    "Design a waterfall cascading into a crystal-clear pool, surrounded by tropical plants.",
    "Show a windy desert with rolling dunes and the sun setting on the horizon.",
    "Create a scene of a dense forest in autumn with vibrant orange, red, and yellow leaves.",
    "Depict a calm lake reflecting a starry night sky and surrounding trees.",
    "Illustrate a grassy field with blooming sunflowers swaying gently in the wind.",
    "Design a coastal cliff with crashing waves below and birds soaring above.",
    "Show a serene, foggy morning over a still lake with pine trees in the background.",
    "Create a spring scene of a blossoming cherry tree with soft pink petals falling gently.",
  ],
  animals: [
    "Generate a scene of wolves howling at the full moon in a dark, misty forest.",
    "Show a group of deer grazing in a peaceful meadow at sunrise.",
    "Design a tropical rainforest with colorful parrots flying between the trees.",
    "Illustrate a pride of lions resting under a large tree in the African savannah.",
    "Depict a playful scene of dolphins jumping through waves in the ocean.",
    "Create an underwater scene with vibrant coral reefs and schools of fish swimming by.",
    "Show a snowy landscape with a lone polar bear walking across the ice.",
    "Design a forest scene with foxes playing near their den in the evening light.",
    "Illustrate an eagle soaring high above a canyon, with the wind beneath its wings.",
    "Show a desert scene with camels trekking across the sand dunes.",
    "Depict a majestic stag standing on a hill at dawn, surrounded by mist.",
    "Create a jungle scene with a tiger prowling through the underbrush.",
    "Show a serene pond with swans gliding gracefully across the water.",
    "Illustrate a pair of owls perched on a tree branch under the moonlight.",
    "Design a forest scene with rabbits hopping through a field of wildflowers.",
  ],
  horror: [
    "Create an eerie forest scene with twisted trees, dense fog, and glowing red eyes peeking from the shadows.",
    "Show a haunted house on a hill, with broken windows and flickering lights inside.",
    "Illustrate a full moon casting an eerie glow over a graveyard filled with old tombstones.",
    "Depict a deserted road in the middle of a foggy, moonlit night with a lone figure in the distance.",
    "Generate an abandoned asylum with cracked walls, broken doors, and an unsettling silence.",
    "Show a dark forest path with shadows lurking behind every tree and a distant, glowing lantern.",
    "Create a dilapidated mansion surrounded by dead trees, with lightning striking in the background.",
    "Depict an old church with cracked stained glass windows and ravens circling the spire.",
    "Design a creepy cornfield under a stormy sky with something unnatural moving among the stalks.",
    "Show a ghostly figure walking through an abandoned city, its form flickering in and out of existence.",
    "Illustrate a stormy night with a lone cabin in the woods and faint candlelight inside.",
    "Create a swamp at dusk, with thick fog rolling over the dark, murky waters.",
    "Depict a sinister carnival at night, with flickering lights and empty rides slowly moving.",
    "Show a shadowy figure standing at the end of a long, dark corridor with doors creaking open.",
    "Design a foggy graveyard with crumbling tombstones and a sense of eerie quiet.",
  ],
  sport: [
    "Generate a soccer stadium under bright lights, with players in action mid-game.",
    "Show a basketball player making a dramatic slam dunk, with fans cheering in the background.",
    "Design a tennis match at sunset, with the ball mid-air and players in motion.",
    "Illustrate a race car speeding down a track, leaving a trail of smoke behind.",
    "Create a baseball scene with a batter about to hit a home run under the evening sky.",
    "Show a football field with players lined up for a tackle, the stadium lights shining brightly.",
    "Depict a cyclist racing along a mountain path, with the wind rushing past.",
    "Design a boxing match in the ring, with one fighter throwing a punch.",
    "Illustrate a surfer riding a massive wave under a sunny sky.",
    "Show an Olympic swimming pool with swimmers racing to the finish line, creating a splash in the water.",
  ],
  technology: [
    "Create a futuristic cityscape with tall, neon-lit buildings and flying cars in the distance.",
    "Show a digital network with glowing circuits connecting across a vast landscape.",
    "Illustrate a sleek, modern interface with holographic displays and data streams flowing.",
    "Depict a robotic arm assembling advanced technology in a high-tech factory.",
    "Generate an abstract background of swirling data streams and glowing binary code.",
    "Show a futuristic space station orbiting a distant planet, with advanced spacecraft docking.",
    "Illustrate a smart home interior with connected devices, holographic displays, and automation.",
    "Design a tech-themed landscape with glowing blue circuits forming pathways over a dark grid.",
    "Create a virtual reality headset with immersive, holographic worlds being generated in the background.",
    "Show an advanced AI system visualized as a neural network, with nodes lighting up in succession.",
  ],
  food: [
    "Generate a vibrant scene of fresh fruits and vegetables laid out on a rustic wooden table.",
    "Show a gourmet dish of sushi, artfully arranged with chopsticks on the side.",
    "Illustrate a cozy kitchen with a stack of pancakes dripping with syrup and butter.",
    "Create a colorful spread of Italian pasta dishes, with steam rising from the plates.",
    "Show a detailed close-up of a rich chocolate cake with layers of frosting and berries on top.",
    "Design a scene of a coffee shop counter with fresh pastries and a steaming cup of coffee.",
    "Depict a street food vendor's stall, with skewers grilling over an open flame.",
    "Illustrate a breakfast spread of scrambled eggs, bacon, toast, and fresh orange juice.",
    "Show a platter of seafood, with lobsters, shrimp, and mussels served on ice.",
    "Create a dessert table filled with cupcakes, macarons, and cookies in pastel colors.",
  ],
  space: [
    "Create a stunning galaxy scene with swirling nebulae, distant stars, and glowing planets.",
    "Show an astronaut floating in the vast emptiness of space with Earth in the distance.",
    "Illustrate a colorful nebula with bright cosmic dust and shining stars scattered throughout.",
    "Depict a massive planet with rings and moons orbiting in the background.",
    "Generate a futuristic spacecraft flying past distant galaxies, leaving a trail of light behind.",
    "Show a black hole warping space, with bright light being pulled into its center.",
    "Illustrate an alien planet surface with strange landscapes and unfamiliar colors in the sky.",
    "Create a space station orbiting a planet, with stars twinkling in the background.",
    "Depict a meteor shower streaking across the night sky over a distant moon.",
    "Design a glowing comet flying through the cosmos, with its icy tail stretching across space.",
  ],
  music: [
    "Generate a concert scene with a rock band performing on stage, surrounded by flashing lights and a cheering crowd.",
    "Show a close-up of a grand piano, with soft light reflecting off its polished surface.",
    "Illustrate a glowing set of musical notes floating through an abstract, colorful space.",
    "Depict a DJ mixing tracks at a club, with bright lights and energy surrounding the scene.",
    "Create a serene music studio with guitars, a keyboard, and recording equipment set up.",
    "Show a violinist playing in a dark room, with a single spotlight highlighting the instrument.",
    "Illustrate a flowing sheet of music, with notes dancing off the page into the air.",
    "Design a jazz band performing in a cozy, dimly lit club, with saxophones and trumpets creating a lively scene.",
    "Show headphones on a table, with musical notes visually floating from them in colorful waves.",
    "Depict an electric guitar with glowing strings, set against a backdrop of abstract sound waves.",
  ],
};

const Form = () => {
  const categories: Category[] = [
    { name: "Nature", src: "/nature.webp" },
    { name: "Sport", src: "/sport.webp" },
    { name: "Animals", src: "/animal.jpg" },
    { name: "Horror", src: "/horror.webp" },
    { name: "Technology", src: "/tech.jpg" },
    { name: "Food", src: "/food.avif" },
    { name: "Space", src: "/space.webp" },
    { name: "Music", src: "/music.jpg" },
  ];

  const [currentType, setCurrentType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [generImage, setGenerImage] = useState<string | null>(null);

  const CategoryCard = ({ name, src }: Category) => (
    <div
      className={`rounded-md ${
        currentType === name.toLowerCase() ? "border-2" : ""
      } border-gray-50 flex flex-col justify-center items-center cursor-pointer relative w-32 h-32 sm:w-52 sm:h-48`}
      onClick={() => setCurrentType(name.toLowerCase())}
    >
      <Image
        className={`object-cover hover:grayscale-0 rounded-md transition-all duration-300 ${
          currentType === name.toLowerCase() ? "grayscale-0" : "grayscale"
        }`}
        alt={name}
        src={src}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <p className="text-white text-xl absolute bottom-1 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-7 rounded-md">
        {name}
      </p>
    </div>
  );

  const getRandomPrompt = useCallback((type: string): string => {
    const promptsForType = prompts[type];
    const randomIndex = Math.floor(Math.random() * promptsForType.length);
    return promptsForType[randomIndex];
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!currentType) return;

    const randomPrompt = getRandomPrompt(currentType);
    try {
      setIsLoading(true);
      setOpen(true);

      const res = await axios.post(
        `https://image.pollinations.ai/prompt/${randomPrompt}`,
        {},
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([res.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setGenerImage(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentType, getRandomPrompt]);

  const downloadImage = () => {
    if (generImage) {
      const link = document.createElement("a");
      link.href = generImage;
      link.setAttribute("download", "generated-image.png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setOpen(false);
      setCurrentType("");
      setGenerImage(null);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <CustomButton
          disabled={isLoading || currentType === ""}
          onClick={handleGenerate}
        />
      </div>
      <AlertDialog open={open}>
        {isLoading ? (
          <AlertDialogContent className="scale-75">
            <AlertDialogHeader>
              <AlertDialogTitle className="hidden"></AlertDialogTitle>
              <AlertDialogDescription className="hidden"></AlertDialogDescription>
            </AlertDialogHeader>
            <Image
              alt="loading"
              src="/progress.gif"
              width={140}
              height={100}
              className="object-cover mx-auto"
            />
          </AlertDialogContent>
        ) : (
          <AlertDialogContent className="p-2 scale-[.85]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-xl lg:text-2xl">
                Your image
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              <Image
                alt="image"
                src={generImage || "/music.jpg"}
                priority
                width={500}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 43vw"
                className="object-cover rounded-md"
                style={{ clipPath: "inset(0 0 30px 0)" }}
              />
            </div>
            <AlertDialogFooter className="-mt-7">
              <AlertDialogCancel
                onClick={() => {
                  setOpen(false);
                  setCurrentType("");
                  setGenerImage(null);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={downloadImage}>
                Download
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
};

export default Form;
