import React from "react";
import Reviews from "../components/reviews";
import { getUserBySlug } from "@/lib/db/user";

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const user = await getUserBySlug(slug);
  if (!user)
    return (
      <div className="flex items-center justify-center mt-8">
        Usuário não encontrado
      </div>
    );

  return (
    <div className="max-w-4xl w-full mx-auto flex items-center justify-between flex-col gap-12">
      <header className="w-full bg-[#171D25] p-6 mt-4 rounded-md shadow-2xl flex items-start justify-between">
        <div className="flex items-start gap-6 h-full">
          {/** Imagem */}
          <div className="h-36 w-36 bg-cyan-800 rounded-sm"/>

          {/** Informacoes */}
          <div className="flex flex-col items-start max-w-[300px] justify-between h-36 gap-2">
            <div>
              <p className="text-xl">{user.username}</p>
              <p className="text-[#c4c4c4] text-xs max-w-[300px]">
                {user.email}
              </p>
            </div>
            <p className="text-[#c4c4c4] text-sm max-w-[300px]">
              {user.description}
            </p>
          </div>
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
