import Image from "next/image";
import Link from "next/link";
import AuthArea from "./AuthArea";
import BanglaDate from "./BanglaDate";
import CategoryNav from "./CategoryNav";
import type { Category } from "@/lib/types";

export default function Navbar({ categories }: { categories: Category[] }) {
  return (
    <header className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary">
    <Image
      src="/logo-icon.png"
      alt=""
      width={24}
      height={24}
      className="brightness-0 invert"
    />
  </span>
  <span className="flex flex-col leading-tight">
    <span className="text-lg font-bold sm:text-xl">বাজার দর</span>
    <BanglaDate />
  </span>
</Link>
        <AuthArea />
      </div>
      <CategoryNav categories={categories} />
    </header>
  );
}