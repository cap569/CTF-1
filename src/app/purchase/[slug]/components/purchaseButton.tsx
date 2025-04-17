"use client";

import axios from "axios";
import { useState } from "react";

function PurchaseButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handlePurchase = async () => {
    if (loading) return;
    setLoading(true);
    setErr("");
    await axios
      .post("/api/purchase", {
        id,
      })
      .then(() => {
        location.href = "/library";
      })
      .catch((err) => {
        setErr(err.response.data.error);
      });
    setLoading(false);
  };

  return (
    <>
      <div
        onClick={handlePurchase}
        className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 text-white transition-all delay-75"
      >
        Confirmar Compra
      </div>
      {err && (
        <p className="text-red-500 text-sm w-full text-left mt-0">{err}</p>
      )}
    </>
  );
}

export default PurchaseButton;
