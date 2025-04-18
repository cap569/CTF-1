import Link from "next/link";
import React from "react";

function AdminNavbar() {
  return (
    <div className="w-full h-24 bg-[#171D25]">
      <div className="max-w-4xl w-full mx-auto flex items-center h-full justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-red-500">Admin</h1>
          <p className="text-sm text-[#dcdedf]">Steem Dashboard</p>
        </div>

        <div className="flex items-center gap-4 font-medium text-lg text-[#dcdedf]">
          <Link
            className={`hover:text-white uppercase transition-all delay-75`}
            href={"/admin/jogos"}
          >
            Jogos
          </Link>
          <Link
            className={`hover:text-white uppercase transition-all delay-75`}
            href={"/admin/users"}
          >
            Usuarios
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
