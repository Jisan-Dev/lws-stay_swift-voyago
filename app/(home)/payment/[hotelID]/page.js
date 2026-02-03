import PaymentForm from "@/components/payment/PaymentForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PaymentPage = async () => {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session.user) return redirect("/login");
  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>Effotel By Sayaji Jaipur</b> and base price is <b>$10</b>
        </p>
        <PaymentForm />
      </div>
    </section>
  );
};

export default PaymentPage;
