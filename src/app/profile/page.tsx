import Link from "next/link";
import React from "react";
import Reviews from "./components/reviews";

function Page() {
  return (
    <div className="max-w-4xl w-full mx-auto flex items-center justify-between flex-col gap-12">
      <header className="w-full bg-[#171D25] p-6 mt-4 rounded-md shadow-2xl flex items-start justify-between">
        <div className="flex items-start gap-6 h-full">
          {/** Imagem */}
          <div className="h-36 w-36 bg-cyan-800 rounded-sm" />

          {/** Informacoes */}
          <div className="flex flex-col items-start max-w-[300px] justify-between h-36 gap-2">
            <div>
              <p className="text-xl">Nome pica das galaxias</p>
              <p className="text-[#c4c4c4] text-xs max-w-[300px]">20/04/2025</p>
            </div>
            <p className="text-[#c4c4c4] text-sm max-w-[300px]">
              Descricao bem elaborada do meu nome de usuario
            </p>
          </div>
        </div>

        <div className="flex items-end flex-col justify-between h-36">
          <div className="flex items-center gap-3">
            <p className="text-lg">Level</p>
            <div className="w-8 h-8 flex font-semibold items-center justify-center rounded-full border-2 border-[#949494] text-[#949494]">
              1
            </div>
          </div>
          <Link
            className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
            href={"/editprofile"}
          >
            Editar perfil
          </Link>
        </div>
      </header>

      {/** Lista de jogos */}
      {/** Deve ter botao de refund */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <Reviews />
        <Reviews />
        <Reviews />
        <Reviews />
      </div>
    </div>
  );
}

export default Page;
