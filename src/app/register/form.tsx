"use client";

import { validateEmail } from "@/utils/email";
import React, { useState } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const valid = name && pass && email && validateEmail(email) && !loading;

  const handleRegister = () => {
    if (!valid) return;
    // @TODO: Check email
    setLoading(true);
    // @TODO: Login
  };

  return (
    <form
      className="flex flex-col w-full items-start"
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <p className="text-[#1999ff] text-base font-medium">
        Crie sua conta grátis!
      </p>

      <p className="mt-5 text-[#afafaf] text-xs font-medium">NOME DE USUÁRIO</p>
      <input
        className="h-10 mt-0.5 text-sm w-[400px] bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className="text-[#afafaf] mt-3 text-xs font-medium">EMAIL</p>
      <input
        className="h-10 mt-0.5 text-sm w-[400px] bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p className="mt-3 text-[#afafaf] text-xs font-medium">SENHA</p>
      <input
        type="password"
        className="h-10 mt-0.5 text-sm w-[400px] bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button
        className={`mt-6 opacity-80 hover:opacity-100 cursor-pointer h-11 rounded-sm w-full bg-linear-to-r from-[#07BFFF] to-[#2D73FF] ${
          !valid
            ? "from-[#32353c] to-[#32353c] opacity-100 cursor-not-allowed!"
            : ""
        }`}
        type="submit"
      >
        Registrar
      </button>
    </form>
  );
}

export default RegisterForm;
