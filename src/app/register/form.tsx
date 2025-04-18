"use client";

import { validateEmail } from "@/utils/email";
import axios from "axios";
import React, { useState } from "react";
import Turnstile from "react-turnstile";

function RegisterForm() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);
  const valid =
    captcha && name && pass && email && validateEmail(email) && !loading;

  const handleRegister = async () => {
    if (!valid) return;
    setLoading(true);
    await axios
      .post(
        "/api/register",
        {
          username: name,
          email,
          password: pass,
          captcha,
        },
        { withCredentials: true }
      )
      .then(() => {
        location.href = "/";
        setErr("");
      })
      .catch((err) => {
        setErr(err.response.data.error);
      });
    setLoading(false);
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
        className="h-10 mt-0.5 mb-3.5 text-sm w-[400px] bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      {/** Mehh, .env not working here, so just use hardcoded sitekey */}
      <Turnstile
        sitekey={"0x4AAAAAABOj2nss3mIxF1dZ"}
        onSuccess={(token) => setCaptcha(token)}
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

      {err && (
        <p className="text-red-600 text-sm w-full text-center mt-4">{err}</p>
      )}
    </form>
  );
}

export default RegisterForm;
