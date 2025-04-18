import React from "react";
import Form from "./components/form";
import { getGameById } from "@/lib/db/game";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await getGameById(slug);

  if (!game)
    return (
      <p className="w-full text-lg mt-8 text-center">Jogo não encontrado</p>
    );

  return (
    <div className="max-w-4xl p-8 rounded-md mt-8 bg-[#171D25] w-full mx-auto flex items-start justify-start flex-col">
      <p className="text-[#1999ff] text-sm mb-6 font-medium uppercase">
        EDITAR JOGO
      </p>
      <Form
        id={game.id}
        d_name={game.name}
        d_slug={game.slug}
        d_price={game.price}
        d_description={game.description}
        d_activePromo={game.activePromo}
        d_photo={game.photoUrl}
      />
    </div>
  );
}

export default Page;
