import Image from "next/image";
import React from "react";

interface LargeCardProps {
  name: string;
  description: string;
  photo: string;
  price: number;
  promo: number;
}

function LargeCard({ name, description, photo, price, promo }: LargeCardProps) {
  const discount = (price * promo) / 100;
  const newPrice = price - discount;
  return (
    <div className="flex items-center cursor-pointer w-full bg-[#16212E] group hover:bg-[#A2C7DD]">
      {/** Image */}
      <Image
        height={100}
        width={100}
        alt="Game Photo"
        src={photo}
        className="h-18 w-44 object-cover"
      />
      <div className="flex items-center justify-between px-6 w-full">
        <div>
          <p className="text-[#BDCBD7] group-hover:text-[#10161B]">{name}</p>
          <p className="text-sm text-[#5E6D7C]">{description}</p>
        </div>

        {promo > 0 ? (
          <div className="flex items-center justify-start">
            <div className="h-10 flex flex-col items-end pr-2 pl-3 py-0.5">
              <p className="text-xs line-through text-[#617381] ">
                R$ {price.toFixed(2)}
              </p>
              <p className="text-sm text-[#BEEE11]">R$ {newPrice.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div className="group-hover:text-[#10161B] text-[#a4a9ac]">
            R$ {newPrice.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default LargeCard;
