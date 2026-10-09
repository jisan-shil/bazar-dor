"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export default function AuthArea() {
  const { data, isPending } = useSession();
  const router = useRouter();

  if (isPending) return <div className="skeleton h-10 w-32 rounded-full" />;

  if (!data?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { name, email, image } = data.user;
  const close = () => (document.activeElement as HTMLElement | null)?.blur();

  const handleSignOut = async () => {
    close();
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি"),
      },
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex cursor-pointer items-center gap-2">
        <span className="avatar placeholder">
          <span className="size-9 rounded-full bg-primary text-primary-content grid place-items-center overflow-hidden">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} referrerPolicy="no-referrer" />
            ) : (
              <span className="text-sm font-semibold">{name?.charAt(0).toUpperCase()}</span>
            )}
          </span>
        </span>
        <span className="hidden text-sm font-medium sm:block">{name?.split(" ")[0]}</span>
        <span className="text-[10px]">▾</span>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-64 rounded-box border border-base-300 bg-base-100 p-4 shadow-lg"
      >
        <p className="font-semibold">{name}</p>
        <p className="mb-3 truncate text-xs text-base-content/60">{email}</p>
        <Link href="/profile" onClick={close} className="block rounded-lg px-2 py-2 text-sm hover:bg-base-200">
          👤 আমার প্রোফাইল
        </Link>
        <button onClick={handleSignOut} className="w-full rounded-lg px-2 py-2 text-left text-sm text-error hover:bg-error/10">
          ↩ সাইন আউট
        </button>
      </div>
    </div>
  );
}