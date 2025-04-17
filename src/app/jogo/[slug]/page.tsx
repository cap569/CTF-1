import Navbar from "@/components/navbar";
import { getGameBySlug } from "@/lib/db/game";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const game = await getGameBySlug(slug);
  if (!game)
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center mt-8">
          Jogo não encontrado
        </div>
      </>
    );

  const discount = (game.price * game.activePromo) / 100;
  const newPrice = game.price - discount;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between flex-col gap-12">
        <header className="w-full bg-[#171D25] p-6 mt-4 rounded-md shadow-2xl flex items-start justify-between">
          <div className="flex items-start gap-6 h-full w-full">
            {/** Imagem */}
            <Image
              src={game.photoUrl}
              height={200}
              width={400}
              alt={"Game image"}
              className="h-[200px] w-[400px] object-cover rounded-sm bg-[#282f39]"
            />

            {/** Informacoes */}
            <div className="flex flex-col items-start w-full justify-between h-[200px] gap-2">
              <div>
                <p className="text-xl">{game.name}</p>
                <p className="text-[#c4c4c4] text-xs">{game.description}</p>
              </div>
              <div className="flex items-end justify-between w-full">
                {game.activePromo > 0 ? (
                  <div className="flex items-center justify-start mt-2">
                    <div className="px-1.5 h-10 py-0.5 flex items-center justify-center bg-[#4C6B22] font-semibold text-2xl text-[#BEEE11]">
                      -{game.activePromo}%
                    </div>
                    <div className="bg-[#344654] h-10 flex flex-col items-end pr-2 pl-3 py-0.5">
                      <p className="text-xs line-through text-[#617381] ">
                        R$ {game.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-[#BEEE11]">
                        R$ {newPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-base text-[#a4a9ac]">
                    R$ {game.price.toFixed(2)}
                  </p>
                )}

                <Link
                  href={`/purchase/${game.slug}`}
                  className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
                >
                  Comprar Jogo
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Page;
