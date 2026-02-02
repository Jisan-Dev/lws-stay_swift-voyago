"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = {
      name: data.get("fname") + " " + data.get("lname"),
      email: data.get("email"),
      password: data.get("password"),
      // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    };
    const res = await authClient.signUp.email(formData, {
      onSuccess: (ctx) => {
        router.push("/");
      },
      onError: (err) => {
        console.log("Error: ", err);
      },
    });
    console.log("Response: ", res);
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" id="fname" />
      </div>

      <div>
        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lname" id="lname" />
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <button type="submit" className="btn-primary w-full mt-4">
        Create account
      </button>
    </form>
  );
};

export default RegistrationForm;
