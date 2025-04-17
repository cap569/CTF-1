import { getGamesCount, listGames } from "@/lib/db/game";
import React from "react";
import GameTable from "./components/gameTable";
import Link from "next/link";

async function Page() {
  const gamesCount = getGamesCount();
  const games = await listGames(1);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <header className="flex items-center mb-4 justify-between">
        <p className="text-lg text-[#8A939B]">
          Últimos {games.length} jogos{" "}
          <span className="text-sm">({gamesCount} totais)</span>:
        </p>

        <Link
          href={"/admin/novojogo"}
          className="from-[#2A475E] to-[#223143] bg-gradient-to-b text-sm px-4 py-1.5 rounded-sm cursor-pointer opacity-100 hover:opacity-85 transition-all delay-75"
        >
          Adicionar Jogo
        </Link>
      </header>

      <GameTable games={games} />
    </div>
  );
}

export default Page;
