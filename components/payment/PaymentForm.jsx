"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentForm = ({ checkin, checkout, hotelInfo, totalCost }) => {
  const [error, setError] = useState("");
  const { data: session, isPending } = authClient.useSession();
  console.log("session", session);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const formData = new FormData(e.target);
      const hotelId = hotelInfo?._id;
      const userId = session?.user?.id;
      const checkin = formData.get("checkin");
      const checkout = formData.get("checkout");

      console.log(checkin, checkout);

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelId, userId, checkin, checkout }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await res.json();
      console.log("Payment response", data);
      alert("Payment successful! Your booking has been created.");
      router.replace("/bookings");
    } catch (error) {
      console.error("Something went wrong with creating payment:", error);
      setError(error.message);
      alert("Something went wrong with creating payment: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      <div className="my-4 space-y-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={isPending ? "Loading..." : session?.user?.name || ""}
          disabled
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={isPending ? "Loading..." : session?.user?.email || ""}
          disabled
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input type="date" name="checkin" id="checkin" value={checkin} />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input type="date" name="checkout" id="checkout" value={checkout} />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Pay Now (${totalCost.toFixed(2)})
      </button>
    </form>
  );
};

export default PaymentForm;
