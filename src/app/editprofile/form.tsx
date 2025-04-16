"use client";

import axios from "axios";
import React, { useState } from "react";

function Form({
  d_username,
  d_email,
  d_description,
}: {
  d_username: string;
  d_email: string;
  d_description: string;
}) {
  const [description, setDescription] = useState(d_description);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = async () => {
    if (loading) return;
    setLoading(true);
    await axios
      .post("/api/updateprofile", {
        description,
      })
      .then(() => {
        location.href = "/profile";
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
          <p>Nome de usuário</p>
          <input
            value={d_username}
            disabled
            className="h-10 rounded-sm mt-0.5 text-sm w-full text-[#8e969d] bg-[#32353C] cursor-not-allowed  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>Email</p>
          <input
            value={d_email}
            disabled
            className="h-10 rounded-sm mt-0.5 text-sm w-full text-[#8e969d] bg-[#32353C] cursor-not-allowed outline-none pl-4 "
          />
        </div>
      </div>

      <div className="flex flex-col items-start w-full">
        <p>Descrição</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-sm mt-0.5 text-sm w-full bg-[#32353C] hover:bg-[#3d4047]  outline-none px-4 pt-4 "
        />
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
