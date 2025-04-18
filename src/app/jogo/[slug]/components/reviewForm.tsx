"use client";

import axios from "axios";
import { useState } from "react";

interface ReviewFormProps {
  purchaseId: string;
  d_stars?: number;
  d_description?: string;
  hasReviewed: boolean;
}

function ReviewForm({
  purchaseId,
  d_stars,
  d_description,
  hasReviewed,
}: ReviewFormProps) {
  const [stars, setStars] = useState(d_stars || 0);
  const [description, setDescription] = useState(d_description);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReview = async () => {
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    setErr("");
    await axios
      .post("/api/review", {
        _id: purchaseId,
        stars,
        review: description,
      })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setErr(err.response.data.error);
      });

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-start">
      <div className="flex items-start gap-1">
        <div
          onClick={() => setStars(1)}
          className={`cursor-pointer text-xl ${
            stars >= 1 ? "text-amber-500" : "text-[#949494]"
          }`}
        >
          ★
        </div>
        <div
          onClick={() => setStars(2)}
          className={`cursor-pointer text-xl ${
            stars >= 2 ? "text-amber-500" : "text-[#949494]"
          }`}
        >
          ★
        </div>
        <div
          onClick={() => setStars(3)}
          className={`cursor-pointer text-xl ${
            stars >= 3 ? "text-amber-500" : "text-[#949494]"
          }`}
        >
          ★
        </div>
        <div
          onClick={() => setStars(4)}
          className={`cursor-pointer text-xl ${
            stars >= 4 ? "text-amber-500" : "text-[#949494]"
          }`}
        >
          ★
        </div>
        <div
          onClick={() => setStars(5)}
          className={`cursor-pointer text-xl ${
            stars >= 5 ? "text-amber-500" : "text-[#949494]"
          }`}
        >
          ★
        </div>
      </div>

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
      />

      <div
        onClick={handleReview}
        className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
      >
        {hasReviewed ? "Alterar Avaliação" : "Enviar Avaliação"}
      </div>

      {err && <p className="text-red-600 text-sm w-full text-left">{err}</p>}

      {success && (
        <p className="text-emerald-600 text-sm w-full text-left">
          Avaliação Enviada
        </p>
      )}
    </div>
  );
}

export default ReviewForm;
