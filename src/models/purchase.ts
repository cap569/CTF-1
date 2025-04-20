import mongoose from "mongoose";
import "./games";
import "./users";

const purchaseSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: { type: String },
  stars: { type: Number },
  // Transactions in mongo are actual TRASH
  // so we create a hash (user_game) to guarantee
  // the only purchase.
  hash: { type: String, required: true, unique: true },
});

const Purchase =
  mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);

export default Purchase;
