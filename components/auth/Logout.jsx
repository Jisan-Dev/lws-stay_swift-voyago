"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.replace("/login");
            },
          },
        });
      }}
      className="text-orange-600 font-md"
    >
      Sign Out
    </button>
  );
}
