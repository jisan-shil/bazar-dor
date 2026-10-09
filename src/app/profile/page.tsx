import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?denied=1&redirect=/profile");
  const { name, email, image } = session.user;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-col items-start gap-4 rounded-box border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center overflow-hidden rounded-xl bg-primary text-2xl font-bold text-primary-content">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </span>
          <div className="min-w-0">
            <p className="text-lg font-semibold">{name}</p>
            <p className="truncate text-sm text-base-content/60">{email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-box border border-base-300 bg-base-100 p-5">
        <h2 className="mb-4 text-lg font-bold">তথ্য</h2>
        <dl className="mb-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-base-content/60">নাম</dt>
            <dd className="font-medium">{name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-base-content/60">ইমেইল</dt>
            <dd className="truncate font-medium">{email}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary w-full">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}