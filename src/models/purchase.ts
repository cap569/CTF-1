import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: { type: String },
  stars: { type: Number },
});

const Purchase =
  mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

export default Purchase;
