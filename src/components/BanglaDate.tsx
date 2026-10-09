"use client";
import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/bn";

const noop = () => () => {};

export default function BanglaDate({
  className = "block min-h-4 text-xs text-base-content/70",
}: {
  className?: string;
}) {
  const date = useSyncExternalStore(noop, banglaDate, () => "");
  return <span className={className}>{date}</span>;
}