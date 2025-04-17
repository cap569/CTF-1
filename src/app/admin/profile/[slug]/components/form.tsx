"use client";

import axios from "axios";
import React, { useState } from "react";

function Form({
  id,
  d_email,
  d_name,
  d_description,
  d_balance,
  d_role,
}: {
  id: string;
  d_email: string;
  d_name: string;
  d_description: string;
  d_balance: number;
  d_role: "admin" | "user";
}) {
  const [name, setName] = useState(d_name);
  const [email, setEmail] = useState(d_email);
  const [description, setDescription] = useState(d_description);
  const [balance, setBalance] = useState(d_balance);
  const [role, setRole] = useState<"admin" | "user">(d_role);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    setErr("");
    await axios
      .post("/api/admin/profile", {
        id,
        username: name,
        email,
        description,
        balance,
        role,
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
    <div className="w-full flex flex-col gap-8 items-start">
      <div className="w-full grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <p>Nome de usuário</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start">
          <p>Saldo</p>
          <input
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            type="number"
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C]  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>Role</p>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1">
              <div
                onClick={() => setRole("admin")}
                className="flex items-center justify-center h-5 cursor-pointer w-5 bg-[#32353C] rounded-sm"
              >
                {role == "admin" ? "✓" : ""}
              </div>
              <p>Admin</p>
            </div>
            <div className="flex items-center gap-1">
              <div
                onClick={() => setRole("user")}
                className="flex items-center justify-center h-5 cursor-pointer w-5 bg-[#32353C] rounded-sm"
              >
                {role == "user" ? "✓" : ""}
              </div>
              <p>User</p>
            </div>
          </div>
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

      {success && (
        <p className="text-emerald-600 text-sm w-full text-left -mt-4">
          Usuário atualizado
        </p>
      )}
    </div>
  );
}

export default Form;
