import { getUserById } from "@/lib/db/user";
import React from "react";
import Form from "./components/form";

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const user = await getUserById(slug);

  if (!user)
    return (
      <p className="w-full text-lg mt-8 text-center">Usuário não encontrado</p>
    );

  return (
    <div className="max-w-4xl p-8 rounded-md mt-8 bg-[#171D25] w-full mx-auto flex items-start justify-start flex-col">
      <p className="text-[#1999ff] text-sm mb-6 font-medium uppercase">
        EDITAR USUÁRIO
      </p>
      <Form
        id={user.id}
        d_balance={user.balance}
        d_description={user.description}
        d_email={user.email}
        d_name={user.username}
        d_role={user.isAdmin ? "admin" : "user"}
      />
    </div>
  );
}

export default Page;
