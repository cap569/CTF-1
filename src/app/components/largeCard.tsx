import React from "react";

function LargeCard() {
  return (
    <div className="flex items-center cursor-pointer w-full bg-[#16212E] group hover:bg-[#A2C7DD]">
      {/** Image */}
      <div className="h-18 w-44 bg-pink-600 " />
      <div className="flex items-center justify-between px-6 w-full">
        <div>
          <p className="text-[#BDCBD7] group-hover:text-[#10161B]">Crashlands 2</p>
          <p className="text-sm text-[#5E6D7C]">RPG, Open World Survival Craft, Survival, Open World</p>
        </div>
        {/** If there's a promo it needs to display the percentage */}
        <div className="group-hover:text-[#10161B]">
            R$ 73,99
        </div>
      </div>
    </div>
  );
}

export default LargeCard;
