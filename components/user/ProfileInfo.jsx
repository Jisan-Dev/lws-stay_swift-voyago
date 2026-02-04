import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const ProfileInfo = async () => {
  const { user } = await auth.api.getSession({ headers: headers() });
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="relative max-h-[180px] max-w-[180px] rounded-full lg:mb-8 h-[100px] w-[100px] bg-orange-600 grid place-items-center text-4xl text-white">
        {user?.image ? (
          <Image
            src={user?.image}
            alt={user?.name}
            width={90}
            height={90}
            className="rounded-full"
            priority
          />
        ) : (
          <span>
            {user?.name
              ?.split(" ")
              .filter(Boolean)
              .map((name) => name[0].toUpperCase())
              .join("")}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold lg:text-[28px]">{user?.name}</h3>
        <p className="leading-[231%] lg:text-lg">{user?.email}</p>
      </div>

      <div className="w-3/4 border-b border-[#a4a4a4] py-6 lg:py-4"></div>
    </div>
  );
};

export default ProfileInfo;
