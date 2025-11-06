"use client";
import { checkIfUserLiked, incrementLike } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState, useTransition } from "react";
import Confetti from "./confetti";
import { useTranslations } from "next-intl";

export function LikeButton({
  id,
  initialLikes,
}: {
  id: string;
  initialLikes: number;
}) {
  const t = useTranslations("blog");
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    async function checkLikeStatus() {
      setIsLoading(true);
      const { hasLiked: userHasLiked } = await checkIfUserLiked(id);
      setHasLiked(userHasLiked);
      setIsLoading(false);
    }
    checkLikeStatus();
  }, [id]);
  const handleLike = () => {
    if (hasLiked || isLoading) return;
    setIsLiked(true);
    setHasLiked(true);
    setLikes((prev) => prev + 1); // Optimistic update

    startTransition(async () => {
      const result = await incrementLike(id);
      if (result?.error) {
        // If server action fails, revert the optimistic update
        console.error(result.error);
        setLikes((prev) => prev - 1);
        setHasLiked(false);
        setIsLiked(false);
      } else if (typeof result?.likes === "number") {
        setLikes(result.likes);
      }
    });

    setTimeout(() => {
      setIsLiked(false);
    }, 3000);
  };
  return (
    <div id="like-button-section" className="mt-8 w-full">
      <Confetti active={isLiked}>
        <button
          type="button"
          aria-label="Like"
          aria-pressed={hasLiked}
          aria-busy={isPending || isLoading}
          onClick={handleLike}
          disabled={hasLiked || isPending || isLoading}
          className={cn(
            "relative mx-auto block w-min rounded-full bg-gradient-to-t p-8",
            hasLiked
              ? "from-primary/0 group to-primary/40 cursor-default"
              : "from-muted/0 group to-muted/80 cursor-pointer",
          )}
        >
          <HeartIcon
            weight="fill"
            className={cn(
              "text-4xl",
              hasLiked
                ? "text-primary -translate-y-2 scale-120 drop-shadow-[0_0_10px]"
                : "text-muted-foreground-subtle/50 transition ease-in-out group-hover:-translate-y-2 group-hover:scale-120",
            )}
          />
        </button>
      </Confetti>
      <div
        className="text-muted-foreground-subtle/60 -translate-y-6 overflow-hidden text-center *:transition *:duration-300 *:ease-in-out"
        aria-live="polite"
      >
        <p className={cn(isLiked && "opacity-0")}>
          {t("like.count", {
            count: likes,
            formattedCount: likes,
          })}
        </p>
        <p className={cn("absolute w-full", isLiked && "-translate-y-6")}>
          {t("like.message")}
        </p>
      </div>
    </div>
  );
}
