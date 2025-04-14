import React from "react";

import bg from "../../../public/join_steem.jpg";
import RegisterForm from "./form";
import Link from "next/link";

function Page() {
  return (
    <div className="bg-[#181A21]">
      <div
        className="flex items-center justify-center pt-20 pb-40"
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="bg-[#181A21] px-8 py-6 rounded-md shadow-2xl">
          <RegisterForm />
        </div>
      </div>
      <footer className="flex items-center justify-center mt-14 pb-28  bg-[#181A21]">
        <div className="w-[300px] flex items-center justify-center flex-col">
          <h1 className="text-xl mb-4 font-semibold">Já tem uma conta?</h1>
          <Link href={"/login"} className="cursor-pointer opacity-80 hover:opacity-100 h-8 flex items-center justify-center px-6 bg-linear-to-r from-[#07BFFF] to-[#2D73FF] rounded-xs text-white">
            Entrar agora
          </Link>
        </div>
      </footer>
      <div className="bg-linear-to-b from-[#181A21] to-[#1B2838] w-full h-24"></div>
    </div>
  );
}

export default Page;
