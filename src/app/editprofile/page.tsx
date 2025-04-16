import { getUserById } from "@/lib/db/user";
import validateJwt from "@/lib/validateJwt";
import React from "react";
import Form from "./form";
import PasswordForm from "./passwordform";
import { redirect } from "next/navigation";

async function Page() {
  const token = await validateJwt();
  if (!token) redirect("/login");
  const user = await getUserById(token.id);
  if (!user) redirect("/login");

  const { email, description, username } = user;

  return (
    <>
      <div className="max-w-2xl p-8 rounded-md mt-8 bg-[#171D25] w-full mx-auto flex items-start justify-start flex-col">
        <p className="text-[#1999ff] text-sm mb-6 font-medium uppercase">
          ALTERAR PERFIL
        </p>
        <Form
          d_email={email}
          d_description={description}
          d_username={username}
        />
      </div>
      <div className="max-w-2xl p-8 rounded-md mt-8 bg-[#171D25] w-full mx-auto flex items-start justify-start flex-col">
        <p className="text-[#1999ff] text-sm mb-6 font-medium uppercase">
          Alterar senha
        </p>
        <PasswordForm />
      </div>
    </>
  );
}

export default Page;
