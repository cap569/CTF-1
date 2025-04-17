import { GameInterface } from "@/lib/db/game";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function GameTable({ games }: { games: GameInterface[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#171D25]">
            <th className="py-2 px-4 text-left">FOTO</th>
            <th className="py-2 px-4 text-left">NOME</th>
            <th className="py-2 px-4 text-left">PREÇO</th>
            <th className="py-2 px-4 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {games.map(({ id, photoUrl, name, price }) => (
            <tr key={id} className="border-b border-[#374C67]">
              <td className="py-2 px-4">
                <Image
                  src={photoUrl}
                  alt="photo"
                  height={300}
                  width={300}
                  className="h-24 w-64 object-cover rounded-sm"
                />
              </td>
              <td className="py-2 px-4">{name}</td>
              <td className="py-2 px-4">
                <p>R$ {price.toFixed(2)}</p>
              </td>
              <td className="py-2 px-4">
                <Link legacyBehavior href={`/admin/jogos/${id}`}>
                  ✎ editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameTable;
