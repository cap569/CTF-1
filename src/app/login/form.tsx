"use client";

import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [remember, setRemeber] = useState(true);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const valid = name && pass && !loading;

  const handleLogin = async () => {
    if (!valid) return;
    setLoading(true);
    await axios
      .post(
        "/api/login",
        {
          username: name,
          password: pass,
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
        handleLogin();
      }}
    >
      <p className="text-[#1999ff] text-xs font-medium">
        ENTRE COM O NOME DE USUÁRIO
      </p>
      <input
        className="h-10 mt-0.5 text-sm w-[400px] bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p className="mt-3 text-[#afafaf] text-xs font-medium">SENHA</p>
      <input
        type="password"
        className="h-10 mt-0.5 text-sm w-[400px] bg-[#32353C] hover:bg-[#3d4047]  outline-none pl-4 "
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <div
        onClick={() => setRemeber((e) => !e)}
        className="mt-3 flex items-center gap-1.5 cursor-pointer group"
      >
        <div className="h-5 w-5 rounded-sm bg-[#32353c] group-hover:bg-[#3d4047] flex items-center justify-center text-sm">
          {remember && "✓"}
        </div>
        <p className="text-[#afafaf] text-xs">Lembrar desse computador</p>
      </div>

      <button
        className={`mt-6 opacity-80 hover:opacity-100 cursor-pointer h-11 rounded-sm w-full bg-linear-to-r from-[#07BFFF] to-[#2D73FF] ${
          !valid
            ? "from-[#32353c] to-[#32353c] opacity-100 cursor-not-allowed!"
            : ""
        }`}
        type="submit"
      >
        Entrar
      </button>
      {err && (
        <p className="text-red-600 text-sm w-full text-center mt-4">{err}</p>
      )}
    </form>
  );
}

export default LoginForm;
