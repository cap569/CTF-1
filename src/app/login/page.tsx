import React from "react";

import bg from "../../../public/join_steem.jpg";
import LoginForm from "./form";
import Link from "next/link";
import Navbar from "@/components/navbar";

function Page() {
  return (
    <>
      <Navbar page="login" />

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
            <LoginForm />
          </div>
        </div>
        <footer className="flex items-center justify-center mt-14 pb-28  bg-[#181A21]">
          <div className="w-[300px] flex items-center justify-center flex-col">
            <h1 className="text-xl mb-4 font-semibold">Novo na steem?</h1>
            <Link
              href={"/register"}
              className="rounded-sm cursor-pointer opacity-80 hover:opacity-100 h-8 flex items-center justify-center px-6 bg-linear-to-r from-[#07BFFF] to-[#2D73FF] text-white"
            >
              Criar uma conta
            </Link>
          </div>
          <p className="w-[300px] text-center flex items-center justify-center text-sm text-[#b8b6b4]">
            É grátis e fácil. Descubra vários jogos para jogar com milhões de
            amigos! Entre agora e descubra o mundo mágico da Steem.
          </p>
        </footer>
        <div className="bg-linear-to-b from-[#181A21] to-[#1B2838] w-full h-24"></div>
      </div>
    </>
  );
}

export default Page;
