"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

function Refound({ id, slug }: { id: string; slug: string }) {
  const [loading, setLoading] = useState(false);

  const handleRefound = async () => {
    if (loading) return;
    setLoading(true);
    await axios
      .post("/api/refund", {
        id,
      })
      .then(() => {
        location.href = "/library";
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <footer className="flex items-center justify-between w-full mt-6">
      <div
        onClick={handleRefound}
        className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
      >
        Reembolsar
      </div>

      <Link className="underline text-[#b6bcc0] text-sm" href={`/jogo/${slug}`}>
        Página do jogo
      </Link>
    </footer>
  );
}

export default Refound;
