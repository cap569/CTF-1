import React from "react";
import Form from "./components/form";

function Page() {
  return (
    <div className="max-w-4xl p-8 rounded-md mt-8 bg-[#171D25] w-full mx-auto flex items-start justify-start flex-col">
      <p className="text-[#1999ff] text-sm mb-6 font-medium uppercase">
        ADICIONAR NOVO JOGO
      </p>
      <Form />
    </div>
  );
}

export default Page;
