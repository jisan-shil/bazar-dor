"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data, isPending } = useSession();
  const [typed, setTyped] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const name = typed ?? data?.user.name ?? "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = name.trim();
    if (!value) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    const { error } = await updateUser({ name: value });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-4 text-sm text-base-content/60">আপনার নাম পরিবর্তন করুন।</p>
      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        {isPending ? (
          <div className="space-y-4">
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-12 w-full" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">নাম</span>
              <input
                value={name}
                onChange={(e) => setTyped(e.target.value)}
                type="text"
                className="input w-full"
              />
            </label>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "আপডেট"}
            </button>
            <Link href="/profile" className="btn btn-ghost w-full">
              বাতিল
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}