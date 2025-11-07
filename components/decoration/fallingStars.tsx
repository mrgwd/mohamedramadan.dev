"use client";

import { random, randomFloat } from "@/utils/random";
import { StarIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface Star {
  size: number;
  opacity: number;
  left: number;
  top: number;
  finalX: number;
  finalY: number;
  delay: string;
  duration: number;
}
const config = {
  NUM_STAR: 5,
  MIN_SIZE: 4,
  MAX_SIZE: 8,
  MIN_DURATION: 15,
  MAX_DURATION: 30,
  MAX_DELAY: 5,
};

const generateStars = Array.from({ length: config.NUM_STAR }).map(() => ({
  size: random(config.MIN_SIZE, config.MAX_SIZE),
  opacity: Number(randomFloat(0.1, 0.5)),
  left: random(-3, 5),
  top: random(-3, 3),
  finalX: random(2, 20),
  finalY: random(3, 14),
  delay: randomFloat(1, config.MAX_DELAY),
  duration:
    Math.random() * (config.MAX_DURATION - config.MIN_DURATION) +
    config.MIN_DURATION,
}));

export default function FallingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(generateStars);
  }, []);
  return (
    <div
      aria-hidden="true"
      role="presentation"
      id="falling-stars"
      className="pointer-events-none fixed inset-0 h-44 w-full motion-reduce:hidden"
    >
      {stars.map((star, index) => (
        <StarIcon
          weight="fill"
          key={index}
          className={`absolute text-violet-300`}
          style={
            {
              // Trajectory Variables used by the @keyframes
              "--final-x": `${star.finalX}vw`,
              "--final-y": `${star.finalY}vh`,
              // Standard CSS properties
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              zIndex: random(0, 1),
              // Direct CSS Animation Property using the custom keyframe name
              animation: `float-fade ${star.duration}s linear ${star.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
