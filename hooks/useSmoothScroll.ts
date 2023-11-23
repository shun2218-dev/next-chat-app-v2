"use client";
import { useRef, RefObject } from "react";

export const useSmoothScroll = (isLastMessage: boolean) => {
  const chatRef = useRef<HTMLLIElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const smoothScroll = (ref: RefObject<HTMLUListElement | HTMLLIElement | HTMLDivElement>) => {
    if (isLastMessage && ref.current) {
      ref.current!.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return {
    chatRef,
    infoRef,
    smoothScroll,
  };
};
