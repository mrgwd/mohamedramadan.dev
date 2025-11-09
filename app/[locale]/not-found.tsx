"use client";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  useEffect(() => {
    const decore = document.getElementById("layout-decoration");
    const stars = document.getElementById("falling-stars");
    if (decore) {
      decore.classList.add("grayscale");
      decore.classList.add("glitch");
    }
    if (stars) stars.classList.add("opacity-0");

    return () => {
      if (decore) {
        decore.classList.remove("grayscale");
        decore.classList.remove("glitch");
      }
      if (stars) stars.classList.remove("opacity-0");
    };
  }, []);
  return (
    <>
      <div className="not-found layout relative bg-size-[150px] bg-no-repeat pt-44 text-center ltr:bg-top-right rtl:bg-top-left">
        <div className="absolute top-0 opacity-20 ltr:right-0 rtl:left-0">
          <Image
            className="dark:invert"
            src="/svg/spider-web.svg"
            width={250}
            height={250}
            alt="spider-web"
          />
        </div>
        <div>
          <div
            dir="ltr"
            data-fade-1
            className="from-muted dark:via-muted/20 relative inline-block overflow-hidden bg-gradient-to-b to-transparent bg-clip-text text-8xl font-bold text-transparent select-none lg:text-9xl"
          >
            <p>404</p>
            <div className="absolute top-0 hidden size-28 -translate-x-[4.5rem] animate-spin invert [animation-duration:8s] dark:block dark:invert-0">
              <Image
                src="/svg/spider.svg"
                width={20}
                height={20}
                alt="spider"
              />
            </div>
            <div className="absolute top-0 left-full size-28 -translate-x-5 animate-spin invert delay-[3s] [animation-duration:8s] dark:invert-0">
              <Image
                src="/svg/spider.svg"
                width={20}
                height={20}
                alt="spider"
              />
            </div>
          </div>
        </div>

        <h1 data-fade-2 className="!mb-0 -translate-y-8 !text-base">
          {t("title")}
        </h1>
        <Link
          prefetch
          data-fade-3
          href="/"
          className="group link-decoration flex items-center justify-center gap-2"
        >
          <div className="rounded-md bg-violet-600 from-violet-300 via-transparent to-transparent p-1 transition-all group-hover:bg-gradient-to-bl">
            <Image
              src="/images/logo/white.png"
              width={15}
              height={15}
              alt="Mohamed Ramadan's Logo"
            />
          </div>
          <p>{t("returnHome")}</p>
        </Link>
      </div>
    </>
  );
}
