"use client";

import axios from "axios";
import React, { useState } from "react";

function PasswordForm() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = async () => {
    if (loading) return;
    setLoading(true);
    setSuccess(false);
    await axios
      .post("/api/changepassword", {
        oldPass,
        newPass,
      })
      .then(() => {
        setSuccess(true);
        setErr("");
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
          <p>Senha Atual</p>
          <input
            value={oldPass}
            type="password"
            onChange={(e) => setOldPass(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
          />
        </div>
        <div className="flex flex-col items-start">
          <p>Senha Nova</p>
          <input
            value={newPass}
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
            className="h-10 rounded-sm mt-0.5 text-sm w-full bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
          />
        </div>
      </div>

      <div
        onClick={handleChange}
        className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
      >
        Alterar Senha
      </div>

      {success && (
        <p className="text-emerald-600 text-sm w-full text-left -mt-4">
          Senha alterada com sucesso
        </p>
      )}

      {err && (
        <p className="text-red-600 text-sm w-full text-left -mt-4">{err}</p>
      )}
    </div>
  );
}

export default PasswordForm;
