"use client";
import { random } from "@/utils/random";
import { IconProps } from "@phosphor-icons/react";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import type React from "react";

interface ConfettiProps {
  children: React.ReactNode;
  config?: Partial<ConfettiConfig>;
  Particle?: React.ComponentType<IconProps>;
  active: boolean;
}
// Physics constants
const GRAVITY = 0.2; // Pixels per frame squared - controls how fast particles fall
const FRAME_TIME = 16.67; // Milliseconds per frame (60 FPS)
const ANIMATION_DURATION = 100; // Total frames for the animation

// Configuration
interface ConfettiConfig {
  particleCount: number; // Number of confetti pieces
  spreadRadius: number; // How far particles spread horizontally (pixels)
  upwardForce: number; // Initial upward velocity boost (pixels per frame)
  fallDistance: number; // Maximum distance particles travel downward (pixels)
  minVelocity: number; // Minimum initial velocity
  maxVelocity: number; // Maximum initial velocity
  minSize: number;
  maxSize: number;
}

const DEFAULT_CONFIG: ConfettiConfig = {
  particleCount: 15,
  spreadRadius: 40,
  upwardForce: 4,
  fallDistance: 120,
  minVelocity: 3,
  maxVelocity: 7,
  minSize: 7,
  maxSize: 9,
};

interface ConfettiPiece {
  id: number;
  color: string;
  vx: number; // Horizontal velocity
  vy: number; // Vertical velocity
  x: number; // Current x position
  y: number; // Current y position
  rotation: number; // Current rotation angle
  rotationSpeed: number; // Rotation speed per frame
  size: number; // Particle size in pixels
  shape: "square" | "circle";
}

const COLORS = ["#BE29EC", "#E5D0FF", "#8A2BE2", "#9370DB", "#dddddd"];

export default function Confetti({
  children,
  config = DEFAULT_CONFIG,
  Particle = StarIcon,
  active,
}: ConfettiProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const createConfetti = (): ConfettiPiece[] => {
    return Array.from({ length: finalConfig.particleCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity =
        finalConfig.minVelocity +
        Math.random() * (finalConfig.maxVelocity - finalConfig.minVelocity);
      const velocityMultiplier = finalConfig.spreadRadius / 100;

      return {
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: Math.cos(angle) * velocity * velocityMultiplier,
        vy:
          Math.sin(angle) * velocity * velocityMultiplier -
          finalConfig.upwardForce,
        x: 0,
        y: 0,
        rotation: Math.random() * 180,
        rotationSpeed: (Math.random() - 0.5) * 1,
        size: random(finalConfig.minSize, finalConfig.maxSize),
        shape: Math.random() > 0.5 ? "square" : "circle",
      };
    });
  };
  useEffect(() => {
    if (!active) return;
    handleLike();
  }, [active]);
  const handleLike = () => {
    const pieces = createConfetti();
    setConfetti(pieces);

    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / FRAME_TIME;

      if (elapsed > ANIMATION_DURATION) {
        setConfetti([]);
        return;
      }

      setConfetti((prevConfetti) =>
        prevConfetti.map((piece) => ({
          ...piece,
          x: piece.vx * elapsed,
          y: piece.vy * elapsed + 0.5 * GRAVITY * elapsed * elapsed,
          rotation: piece.rotation + piece.rotationSpeed * elapsed,
        })),
      );

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div role="button" tabIndex={0} className="relative mx-auto w-min">
      {children}

      {confetti.map((piece) => {
        const opacity = Math.max(
          0,
          1 - Math.abs(piece.y) / finalConfig.fallDistance,
        );
        return (
          <Particle
            aria-hidden
            role="presentation"
            weight="fill"
            size={piece.size}
            key={piece.id}
            className="pointer-events-none absolute -z-10"
            style={{
              left: "50%",
              top: "50%",
              color: piece.color,
              transform: `translate(${piece.x}px, ${piece.y}px) rotate(${piece.rotation}deg)`,
              opacity: opacity,
              transition: "none",
            }}
          />
        );
      })}
    </div>
  );
}
