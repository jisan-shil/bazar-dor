"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("redirect") ?? "/";
  const redirect = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  const denied = params.get("denied");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (denied) toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "denied" });
  }, [denied]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">সাইন ইন</h1>
      <p className="mb-6 mt-1 text-center text-sm text-base-content/70">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <div className="rounded-box border border-base-300 bg-base-100 p-5 sm:p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" placeholder="you@example.com" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full" />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
        </form>
        <div className="divider text-xs">অথবা</div>
        <SocialButtons callbackURL={redirect} />
        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm text-base-content/60">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}