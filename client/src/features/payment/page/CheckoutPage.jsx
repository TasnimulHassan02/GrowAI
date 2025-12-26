import { useState } from "react";
import api from "../../../api/axios";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Payment from "../../../asset/Payment.jpg";
import Bkash from "../../../asset/Bkash.jpg";
import Rocket from "../../../asset/Rocket.png";
import Card from "../../../asset/Card.png";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const datasetId = "ds_001";
  const price = 65;

  const buyDataset = async () => {
    try {
      const res = await api.post("/payments/create-session", {
        datasetId,
        price,
        method: paymentMethod,
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <>
      <Navbar />

      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mt-8 ">
        <div className="bg-white border border-primary shadow-md rounded-2xl px-6 py-4 text-2xl font-semibold">
          Payments
        </div>
      </div>

      {/* MAIN */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 mb-16 lg:grid-cols-2 gap-8">

          {/* LEFT – TRUST */}
          <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-10 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold leading-tight">
                Secure Checkout
              </h2>
              <p className="mt-4 text-green-100 text-lg">
                Bank-grade encryption. Zero risk.
                <br />
                Buy datasets with confidence.
              </p>
            </div>

            <img
              src={Payment}
              alt="Secure Payment"
              className="max-w-md mx-auto mt-10 rounded-2xl shadow-2xl"
            />
          </div>

          {/* RIGHT – PAYMENT */}
          <div className="space-y-6">

            {/* SUMMARY */}
            <div className="bg-white border border-primary rounded-3xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Dataset price</span>
                  <span>$60</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform fee</span>
                  <span>$5</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>$65</span>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white border border-primary rounded-3xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Payment Method</h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { id: "card", label: "Card", img: Card },
                  { id: "bkash", label: "bKash", img: Bkash },
                  { id: "rocket", label: "Rocket", img: Rocket },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-2xl p-4 flex flex-col items-center gap-2 transition-all border
                      ${
                        paymentMethod === method.id
                          ? "border-green-500 bg-green-50 shadow-lg scale-105"
                          : "hover:border-gray-300"
                      }`}
                  >
                    <img src={method.img} alt={method.label} className="h-9" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                ))}
              </div>

              {/* CARD FORM */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod !== "card" && (
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                  You’ll be redirected to complete payment securely using{" "}
                  <span className="font-semibold capitalize">
                    {paymentMethod}
                  </span>.
                </div>
              )}

              {/* CTA */}
              <button
                onClick={buyDataset}
                className="cursor-pointer mt-6 w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 rounded-2xl shadow-xl transition"
              >
                Procced to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
