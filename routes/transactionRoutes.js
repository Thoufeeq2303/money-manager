import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    const tx = await Transaction.create(req.body);
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/all", async (req, res) => {
  const data = await Transaction.find().sort({ createdAt: -1 });
  res.json(data);
});


router.delete("/delete/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});


router.put("/edit/:id", async (req, res) => {
  const tx = await Transaction.findById(req.params.id);

  const hours =
    (Date.now() - new Date(tx.createdAt)) / (1000 * 60 * 60);

  if (hours > 12) {
    return res.status(400).json({ msg: "Edit time expired" });
  }

  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});


router.get("/summary", async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(data);
});


export default router;
