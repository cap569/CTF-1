import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  const activeClass = "text-[#1a9fff] border-[#1a9fff] hover:text-[#1a9fff]!";

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
          <Link
            className="hover:text-white transition-all delay-75"
            href={"/library"}
          >
            BIBLIOTECA
          </Link>
          <Link
            className="hover:text-white transition-all delay-75"
            href={"/profile"}
          >
            NOGITZIN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
