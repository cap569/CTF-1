import { getUserById } from "@/lib/db/user";
import validateJwt from "@/lib/validateJwt";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Navbar() {
  const activeClass = "text-[#1a9fff] border-[#1a9fff] hover:text-[#1a9fff]!";

  let user = null;
  const token = await validateJwt();
  if (token) {
    user = await getUserById(token.id);
  }

  return (
    <div className="h-24 w-full flex bg-[#171D25]">
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between">
        <Image
          src={"/logo.svg"}
          height={176}
          width={44}
          alt="logo"
          className="w-[176px] h-[44px]"
        />

        <div className="flex items-center gap-4 font-medium text-lg text-[#dcdedf]">
          <Link
            className={`border-b-2  hover:text-white transition-all delay-75 ${activeClass}`}
            href={"/"}
          >
            LOJA
          </Link>
          {user ? (
            <>
              <Link
                className="hover:text-white transition-all delay-75"
                href={"/library"}
              >
                BIBLIOTECA
              </Link>
              <Link
                className="hover:text-white transition-all delay-75 uppercase"
                href={"/profile"}
              >
                {user.username}
              </Link>
            </>
          ) : (
            <Link
              className="hover:text-white transition-all delay-75 uppercase"
              href={"/login"}
            >
              ENTRAR
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
