import { getUsersCount, listUsers } from "@/lib/db/user";
import React from "react";
import UserTable from "./components/userTable";

async function Page() {
  const userCount = getUsersCount();
  const users = await listUsers(1);
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <header className="flex items-center mb-4 justify-start">
        <p className="text-lg text-[#8A939B]">
          Últimos {users.length} usuários <span className="text-sm">({userCount} totais)</span>:
        </p>
      </header>

      <UserTable users={users} />
    </div>
  );
}

export default Page;
