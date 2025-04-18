import React from "react";
import GameCard from "./components/games";
import Navbar from "@/components/navbar";
import validateJwt from "@/lib/validateJwt";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/db/user";
import Purchase from "@/models/purchase";

async function Page() {
  const token = await validateJwt();
  if (!token) redirect("/login");
  const user = await getUserById(token.id);
  if (!user) redirect("/login");

  const purchases = await Purchase.find({
    user: user.id,
  }).populate("game");

  return (
    <>
      <Navbar page="biblioteca" />
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between flex-col gap-12">
        {purchases.length > 0 ? (
          <div className="mt-8 w-full grid grid-cols-3 gap-3">
            {purchases.map(({ _id, game, price }) => (
              <GameCard
                key={_id.toString()}
                id={_id.toString()}
                photo={game.photoUrl}
                name={game.name}
                price={price}
                slug={game.slug}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-[#c4c4c4]">
            Você ainda não comprou nenhum jogo!
          </p>
        )}
      </div>
    </>
  );
}

export default Page;
