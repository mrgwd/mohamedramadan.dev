"use client";

import { SOCIALS } from "@/constants/social";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const BANNER_STYLE = "color: #7f00ff; font-size: 10px; font-weight: bold;";
const MESSAGE_STYLE = "font-weight: bold; font-size: 14px;";
const REPO_URL = `https://github.com/${SOCIALS.github}/muhammadramadan`;

interface ConsoleBannerProps {
  bannerStyle?: string;
  messageStyle?: string;
  repoUrl?: string;
  disabled?: boolean;
}

export default function ConsoleBanner({
  bannerStyle = BANNER_STYLE,
  messageStyle = MESSAGE_STYLE,
  repoUrl = REPO_URL,
  disabled = false,
}: ConsoleBannerProps): null {
  const t = useTranslations("decoration.consoleBanner");
  useEffect(() => {
    if (disabled) return;
    let cancelled = false;
    const logBanner = async () => {
      const mod = await import("./consoleBannerAscii");
      if (cancelled) return;
      console.log(
        `%c${mod.BANNER_ASCII}\n\n%c${t("title")}\n%s`,
        bannerStyle,
        messageStyle,
        t("message", { repoUrl: repoUrl }),
      );
    };

    logBanner();
    return () => {
      cancelled = true;
    };
  }, [bannerStyle, messageStyle, repoUrl, disabled, t]);

  return null;
}
