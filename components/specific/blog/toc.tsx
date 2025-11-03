"use client";

import { useEffect, useState, useRef } from "react";
import type { Heading } from "@/lib/toc";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export default function TableOfContents({
  headings,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Track which heading was last navigated to manually
  const manualActiveIndex = useRef<number | null>(null);

  // Ref for whether a manual scroll was just triggered
  const justManualScroll = useRef<boolean>(false);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create a new IntersectionObserver
    observer.current = new IntersectionObserver(
      (entries) => {
        // Only handle intersection events if we are NOT in a manual scroll
        // (prevents "sticky" state right after scrollIntoView)
        let updated = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting && !justManualScroll.current) {
            setActiveId(entry.target.id);
            updated = true;
          }
        });
        if (updated) {
          manualActiveIndex.current = null;
        }
        // If in manual scroll, ignore and allow side effect below to setActiveId instead
      },
      { rootMargin: "-10% 0px -60% 0px" },
    );

    // Track all the headings on the page
    const elements = headings.map(({ slug }) => document.getElementById(slug));
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.current?.disconnect();
  }, [headings]);

  const activeIndex = (() => {
    // Prefer "manualActiveIndex" after arrow nav, fallback to intersection observer
    if (
      manualActiveIndex.current !== null &&
      manualActiveIndex.current >= 0 &&
      manualActiveIndex.current < headings.length
    ) {
      return manualActiveIndex.current;
    }
    return headings.findIndex((h) => h.slug === activeId);
  })();

  const handleScrollToHeading = (index: number) => {
    if (index < 0 || index >= headings.length) return;
    const heading = document.getElementById(headings[index].slug);
    console.log("scrolling to", heading);
    if (heading) {
      // Indicate we're doing a manual scroll
      justManualScroll.current = true;
      manualActiveIndex.current = index;
      setActiveId(headings[index].slug);
      heading.scrollIntoView();
      // After a brief delay, allow intersection observer to take over again
      // This delay allows the scrollIntoView to move the heading before observer fires
      setTimeout(() => {
        justManualScroll.current = false;
      }, 300);
    }
  };

  const getPreviousIndex = () => {
    if (activeIndex <= 0) return 0;
    return activeIndex - 1;
  };
  const getNextIndex = () => {
    if (activeIndex === -1) return 0;
    if (activeIndex >= headings.length - 1) return headings.length - 1;
    return activeIndex + 1;
  };

  return (
    <aside
      className={cn(
        "group fixed top-1/2 right-4 flex -translate-y-1/2 flex-col items-center space-y-3 p-2",
        className,
      )}
    >
      <button
        disabled={activeIndex <= 0}
        onClick={() => handleScrollToHeading(getPreviousIndex())}
        aria-label="Scroll to previous heading"
        className={cn(
          "hover:bg-muted rotate-180 cursor-pointer rounded-full p-1 opacity-0 transition-all group-hover:opacity-100",
          activeIndex <= 0 && "cursor-default !opacity-0",
        )}
      >
        <CaretDownIcon />
      </button>

      <ul className="ltr:-scale-x-100">
        {headings.map((heading, index) => {
          // Use the manually tracked index if set, fallback to intersection activeId
          const isActive =
            manualActiveIndex.current !== null
              ? index === manualActiveIndex.current
              : heading.slug === activeId;
          return (
            <li
              key={heading.slug}
              className="animate-fade-down opacity-0"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <Link
                href={`#${heading.slug}`}
                title={heading.text}
                className="hover:bg-muted flex w-full items-center rounded"
              >
                <span
                  className={`mx-3 my-2 block h-0.5 w-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-foreground scale-y-150"
                      : "hover:bg-muted-foreground bg-muted-foreground-subtle"
                  }`}
                  style={{
                    width: heading.level === 2 ? "12px" : "6px",
                    transform: isActive ? "scaleX(1.5)" : "scaleX(1)",
                  }}
                ></span>
                <span className="sr-only">{heading.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => handleScrollToHeading(getNextIndex())}
        disabled={activeIndex === headings.length - 1 || headings.length === 0}
        aria-label="Scroll to next heading"
        className={cn(
          "hover:bg-muted cursor-pointer rounded-full p-1 opacity-0 transition-all group-hover:opacity-100",
          (activeIndex === headings.length - 1 || headings.length === 0) &&
            "cursor-default !opacity-0",
        )}
      >
        <CaretDownIcon />
      </button>
    </aside>
  );
}
