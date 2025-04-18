import Navbar from "@/components/navbar";
import { getGameBySlug } from "@/lib/db/game";
import { getUserById } from "@/lib/db/user";
import validateJwt from "@/lib/validateJwt";
import { redirect } from "next/navigation";
import React from "react";
import PurchaseButton from "./components/purchaseButton";
import Purchase from "@/models/purchase";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const token = await validateJwt();
  if (!token) redirect("/login");
  const user = await getUserById(token.id);
  if (!user) redirect("/login");

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
  const gamePrice = game.price - discount;

  const purchase = await Purchase.findOne({
    game: game.id,
    user: user.id,
  });
  const canBuy = user.balance >= gamePrice && !purchase;

  return (
    <>
      <Navbar />
      <div className="p-6 rounded-sm max-w-xl flex flex-col items-center justify-center bg-[#171D25] mt-8 w-full mx-auto">
        <p className="text-[#1999ff] uppercase text-sm font-medium">
          Finalizar Compra
        </p>

        <div className="flex gap-4 w-full flex-col items-start text-sm text-[#8A939B]  ">
          <div>
            <p className="font-semibold">Produto </p>
            <p className="text-white text-base">{game.name}</p>
          </div>
          <div>
            <p className="font-semibold">Valor Total </p>
            <p className="text-white text-base">R$ {gamePrice}</p>
          </div>
          <div>
            <p className="font-semibold">Seu Saldo </p>
            <p className="text-white text-base">R$ {user.balance}</p>
          </div>

          {canBuy ? (
            <>
              <div>
                <p className="font-semibold">Saldo Apos a Compra </p>
                <p className="text-white text-base">
                  R$ {user.balance - gamePrice}
                </p>
              </div>
              <PurchaseButton id={game.id} />
            </>
          ) : (
            <p>
              {purchase
                ? "Você já tem esse jogo"
                : "Você não tem saldo suficiente para comprar esse jogo"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
