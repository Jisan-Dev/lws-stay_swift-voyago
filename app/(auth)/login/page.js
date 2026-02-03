import LoginForm from "@/components/auth/LoginForm";
import SocialLogins from "@/components/auth/SocialLogins";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const LoginPage = async () => {
  const session = await auth.api.getSession({ headers: headers() });
  // if (session.user) return redirect("/");
  return (
    <section className="h-screen grid place-items-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
        <h4 className="font-bold text-2xl">Sign in</h4>
        <LoginForm />
        <SocialLogins />
      </div>
    </section>
  );
};

export default LoginPage;
