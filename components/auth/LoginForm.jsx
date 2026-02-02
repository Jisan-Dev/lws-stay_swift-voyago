"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const data = new FormData(e.target);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
      callbackURL: "http://localhost:3000", // it will redirect & also reload the page (optional, but reloading is good to fetch the session again after login is successful to avoid stale session or ensure session is properly set)
    };

    const res = await authClient.signIn.email(formData, {
      onSuccess: (ctx) => {
        console.log("Success: ", ctx);
        // router.replace("/");`
      },
    });

    console.log("Response after login: ", res);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button type="submit" className="btn-primary w-full mt-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
