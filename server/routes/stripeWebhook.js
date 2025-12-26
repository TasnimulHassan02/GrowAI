// import express from "express";
// import stripe from "../config/stripe.js";

// const router = express.Router();

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let event;
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       const { datasetId, userId } = session.metadata;
//     }

//     res.json({ received: true });
//   }
// );

// export default router;
