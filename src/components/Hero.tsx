import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-6 rounded-box border border-base-300 bg-base-100 p-6 sm:p-10 md:flex-row">
      <div className="max-w-xl">
        <BanglaDate className="inline-block min-h-7 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary" />
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-3 text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary mt-6">
          সব পণ্য দেখুন
        </a>
      </div>
      <Image
        src="/images/bazar-hero.png"
        alt="সবজির ঝুড়ি"
        width={320}
        height={270}
        priority
        className="h-auto w-56 sm:w-72"
      />
    </section>
  );
}