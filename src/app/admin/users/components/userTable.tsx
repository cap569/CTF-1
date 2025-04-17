import { UserInterface } from "@/lib/db/user";
import Link from "next/link";
import React from "react";

async function UserTable({ users }: { users: UserInterface[] }) {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-[#171D25]">
            <th className="py-2 px-4 text-left">ROLE</th>
            <th className="py-2 px-4 text-left">USERNAME</th>
            <th className="py-2 px-4 text-left">BALANCE</th>
            <th className="py-2 px-4 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, isAdmin, username, balance }) => (
            <tr key={id} className="border-b border-[#374C67]">
              <td className="py-2 px-4">
                {isAdmin ? (
                  <p className="font-semibold text-red-500">admin </p>
                ) : (
                  <p className="text-blue-500">user</p>
                )}
              </td>
              <td className="py-2 px-4">{username}</td>
              <td className="py-2 px-4">
                <p>R$ {balance.toFixed(2)}</p>
              </td>
              <td className="py-2 px-4">
                <Link legacyBehavior href={`/admin/profile/${id}`}>
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

export default UserTable;
