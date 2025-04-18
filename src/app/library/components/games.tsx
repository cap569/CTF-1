import Image from "next/image";
import React from "react";
import Refound from "./refound";

interface GameCardProps {
  id: string;
  photo: string;
  name: string;
  price: number;
  slug: string;
}

function GameCard({ id, photo, name, price, slug }: GameCardProps) {
  return (
    <div className="w-full h-full shadow-2xl">
      <Image
        height={100}
        width={200}
        className="w-full h-64 rounded-t-sm object-cover"
        alt="game image"
        src={photo}
      />

      <footer
        className="
      flex flex-col items-start w-full p-4 pt-3 pb-5 rounded-b-sm
      bg-[#171D25]
      "
      >
        <h1 className="text-lg">{name}</h1>
        <p className="text-sm text-[#b6bcc0]">
          Comprado por R$ {price.toFixed(2)}
        </p>

        <Refound id={id} slug={slug} />
      </footer>
    </div>
  );
}

export default GameCard;
