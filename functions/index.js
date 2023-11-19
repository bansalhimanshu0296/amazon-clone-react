const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51ODLzFL9DeN3mz1cxKLQSuDvuaS1XI8FE1i"+
"DzKzuBwAVteJvqgau4w3s6aDONfOJIOGbxkdaUf9pWFlfAW2tUcrh00HwbfqClb");

// - App Config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (req, res)=>{
  res.status(200).send("Hello World");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Received for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen Commands
exports.api = functions.https.onRequest(app);
