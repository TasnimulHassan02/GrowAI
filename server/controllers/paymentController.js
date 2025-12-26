// import stripe from "../config/stripe.js";

// export const createCheckoutSession = async (req, res) => {
//   const { datasetId, price } = req.body;
//   const userId = req.user.id;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     mode: "payment",
//     customer_email: req.user.email,
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Dataset Purchase",
//           },
//           unit_amount: price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
//     metadata: {
//       datasetId,
//       userId,
//     },
//   });

//   res.json({ url: session.url });
// };
