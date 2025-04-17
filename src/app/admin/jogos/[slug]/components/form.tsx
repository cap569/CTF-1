"use client";

import axios from "axios";
import React, { useState } from "react";

function Form({
  id,
  d_name,
  d_slug,
  d_price,
  d_description,
  d_photo,
  d_activePromo,
}: {
  id: string;
  d_name: string;
  d_slug: string;
  d_price: number;
  d_description: string;
  d_photo: string;
  d_activePromo: number;
}) {
  const [name, setName] = useState(d_name);
  const [slug, setSlug] = useState(d_slug);
  const [price, setPrice] = useState(d_price);
  const [description, setDescription] = useState(d_description);
  const [photoUrl, setPhotoUrl] = useState(d_photo);
  const [activePromo, setActivePromo] = useState(d_activePromo);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = async () => {
    if (loading) return;
    setLoading(true);
    setErr("");
    await axios
      .patch("/api/admin/game", {
        id,
        name,
        slug,
        description,
        photoUrl,
        price,
        activePromo,
      })
      .then(() => {
        location.href = "/admin/jogos";
      })
      .catch((err) => {
        setErr(err.response.data.error);
      });
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-8 items-start">
      <div className="w-full grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <p>Nome do jogo</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>Slug</p>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <p>Descrição</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>
            Foto URL{" "}
            <span className="text-[#8A939B] text-sm">
              (Somente imagem do imgur)
            </span>
          </p>
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <p>Preço</p>
          <input
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>
            Desconto em %{" "}
            <span className="text-[#8A939B] text-sm">(0% é sem desconto)</span>
          </p>
          <input
            value={activePromo}
            onChange={(e) => setActivePromo(Number(e.target.value))}
            type="number"
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
      </div>

      <div
        onClick={handleChange}
        className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
      >
        Salvar Alterações
      </div>

      {err && (
        <p className="text-red-600 text-sm w-full text-left -mt-4">{err}</p>
      )}
    </div>
  );
}

export default Form;
