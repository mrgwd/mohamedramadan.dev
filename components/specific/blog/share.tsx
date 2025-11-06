"use client";
import ExternalLink from "@/components/ui/externalLink";
import { cn } from "@/lib/utils";
import {
  ChecksIcon,
  LinkedinLogoIcon,
  LinkIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function Share({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const t = useTranslations("blog.share");
  const locale = useLocale();
  const twitterPostText = t("twitter", {
    title: title,
    username: "_MuhammedR",
  });
  const linkedinPostText = t("linkedin", {
    title: title,
    username: "Mohamed Ramadan",
  });

  const handleCopy = async () => {
    try {
      const decodedUrl = decodeURI(window.location.href);
      await navigator.clipboard.writeText(decodedUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (err) {
      console.log("Failed to copy text: ", err);
    }
  };

  const blogUrl = `https://mohamedramadan.dev/${locale}/blog/${slug}`;
  const linkedinShareUrl = `https://linkedin.com/preload/sharebox?text=${linkedinPostText} ${blogUrl}`;
  const twitterShareUrl = `https://x.com/intent/tweet?url=${blogUrl}&text=${twitterPostText}`;

  return (
    <div className="space-y-1 text-center text-sm">
      <p>{t("message")}</p>
      <div className="mx-auto flex w-min gap-1">
        <button
          aria-label={t("ariaLabels.copyLink")}
          aria-live="polite"
          type="button"
          onClick={handleCopy}
          disabled={isCopied}
          className="bg-muted relative cursor-pointer overflow-hidden rounded p-1 *:transition disabled:cursor-not-allowed"
        >
          <ChecksIcon
            className={cn("absolute", isCopied ? "" : "translate-y-4")}
          />
          <LinkIcon className={isCopied ? "opacity-0" : "opacity-100"} />
        </button>
        <ExternalLink
          aria-label={t("ariaLabels.shareOnLinkedIn")}
          href={linkedinShareUrl}
          className="bg-muted rounded p-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinLogoIcon />
        </ExternalLink>
        <ExternalLink
          aria-label={t("ariaLabels.shareOnTwitter")}
          className="bg-muted rounded p-1"
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLogoIcon />
        </ExternalLink>
      </div>
      <span className="text-muted-foreground-subtle/60">{t("note")}</span>
    </div>
  );
}
