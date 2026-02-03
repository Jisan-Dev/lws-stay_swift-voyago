"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const SocialLogins = () => {
  const handleSocialSignin = async (provider) => {
    const res = await authClient.signIn.social({ provider });
    console.log("Response after social login: ", res);
  };

  return (
    <>
      <div className="text-center text-xs text-gray-500">or Signup with</div>
      <div className="flex gap-4">
        <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/fb.png" alt="facebook" width={40} height={40} />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleSocialSignin("google")}
          className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
        >
          <Image src="/google.png" alt="google" width={40} height={40} />
          <span>Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogins;
