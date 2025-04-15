import React from "react";
import GameCard from "./components/games";

function Page() {
  return (
    <div className="max-w-4xl w-full mx-auto flex items-center justify-between flex-col gap-12">
      <div className="mt-8 w-full grid grid-cols-3 gap-3">
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  );
}

export default Page;
