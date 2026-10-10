"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    if (!name) return toast.error("আপনার নাম দিন");
    if (!email) return toast.error("ইমেইল দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    try {
      const { error } = await signUp.email({ name, email, password });
      if (error) return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
      router.push("/signin");
    } catch {
      toast.error("সার্ভারের সাথে সংযোগ হয়নি, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-base-content/70">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>
      <div className="rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" placeholder="you@example.com" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
            <input name="confirm" type="password" placeholder="আবার লিখুন" className="input w-full" />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>
        <div className="divider text-xs">অথবা</div>
        <SocialButtons callbackURL="/" />
        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-base-content/60">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}