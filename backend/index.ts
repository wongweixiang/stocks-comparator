// /server/index.ts
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 4000; // backend runs on 4000

app.use(cors()); // allow all origins

app.get("/api/stock", async (req, res) => {
  const symbol = req.query.symbol || "MSFT";
  const interval = req.query.interval || "1d";
  const range = req.query.range || "1y";

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Yahoo Finance data" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
