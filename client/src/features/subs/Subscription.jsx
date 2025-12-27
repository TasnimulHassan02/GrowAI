import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Check } from "lucide-react";

const subscriptionPlans = [
  {
    id: 1,
    name: "Free",
    price: 0,
    features: [
      "Access to basic datasets",
      "Limited downloads",
      "Community support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: 9.99,
    features: [
      "Unlimited dataset downloads",
      "Advanced filtering",
      "Dataset quality & usability scores",
      "Priority support",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    price: 49.99,
    features: [
      "All Pro features",
      "Team collaboration",
      "Custom dataset requests",
      "Dedicated account manager",
    ],
  },
];

function SubscriptionPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    navigate("/checkout", { state: { plan } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mb-10 mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-xl bg-white p-12 shadow-md hover:shadow-xl transition-all ${
                selectedPlan?.id === plan.id ? "border-primary" : "border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-6">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">
                ${plan.price.toFixed(2)}
                {plan.price > 0 && <span className="text-base font-normal"> / month</span>}
              </p>

              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-2 rounded-lg cursor-pointer text-black font-semibold ${
                  selectedPlan?.id === plan.id ? "bg-green-600 text-black" : "bg-primary hover:bg-primary-dark text-black"
                } transition-colors`}
              >
                {selectedPlan?.id === plan.id ? "Selected" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SubscriptionPage;
