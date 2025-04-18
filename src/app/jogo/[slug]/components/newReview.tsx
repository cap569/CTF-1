import { getUserById } from "@/lib/db/user";
import connectDB from "@/lib/mongoose";
import validateJwt from "@/lib/validateJwt";
import Purchase from "@/models/purchase";
import React from "react";
import ReviewForm from "./reviewForm";

async function NewReview({ gameId }: { gameId: string }) {
  const token = await validateJwt();
  if (!token) return <></>;
  const user = await getUserById(token.id);
  if (!user) return <></>;

  await connectDB();
  const purchase = await Purchase.findOne({
    game: gameId,
    user: user.id,
  });

  if (!purchase) return <></>;

  const hasReviewed = purchase.review;

  return (
    <div className="w-full bg-[#171D25] p-6 rounded-md shadow-2xl flex flex-col items-start gap-4">
      <p className="uppercase text-[#1999ff] text-sm">
        {hasReviewed ? "Sua avaliação" : "Deixe sua avaliação"}
      </p>

      <ReviewForm
        purchaseId={purchase._id.toString()}
        d_stars={purchase.stars}
        d_description={purchase.review}
        hasReviewed={hasReviewed}
      />
    </div>
  );
}

export default NewReview;
