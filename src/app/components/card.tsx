import Image from "next/image";
import React from "react";

interface CardInterface {
  name: string;
  photo: string;
  price: number;
  promo: number;
}

function Card({ name, photo, price, promo }: CardInterface) {
  const discount = (price * promo) / 100;
  const newPrice = price - discount;

  return (
    <div className="relative w-full h-full shadow-2xl cursor-pointer hover:opacity-85 transition-all delay-100">
      <Image
        height={200}
        width={200}
        className="w-full h-64 rounded-t-sm object-cover"
        alt="game image"
        src={photo}
      />

      <footer
        className="
      w-full p-4 pt-3 pb-5 rounded-b-sm
      bg-linear-to-b from-[#194F71] to-[#2480A7]
      "
      >
        <h1>{name}</h1>
        {/** Disconto */}
        <div className="flex items-center justify-start mt-2">
          <div className="px-1.5 h-10 py-0.5 flex items-center justify-center bg-[#4C6B22] font-semibold text-2xl text-[#BEEE11]">
            -{promo}%
          </div>
          <div className="bg-[#344654] h-10 flex flex-col items-end pr-2 pl-3 py-0.5">
            <p className="text-xs line-through text-[#617381] ">
              R$ {price.toFixed(2)}
            </p>
            <p className="text-sm text-[#BEEE11]">
              R$ {newPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Card;
