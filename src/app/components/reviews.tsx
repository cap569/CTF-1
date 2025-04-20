import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ReviewProps {
  stars: number;
  name: string;
  review: string;
  photoUrl: string;
  id: string;
  slug: string;
}

function Reviews({ name, stars, review, slug, photoUrl, id}: ReviewProps) {
  return (
    <div id={id} className="bg-[#171D25] p-4 rounded-sm w-full">
      <header className="flex items-start gap-2.5">
        <Image
          alt="photo"
          src={photoUrl}
          height={100}
          width={100}
          className="h-11 w-14 bg-[#282f39] object-cover rounded-sm"
        />
        <div>
          <Link className="underline" href={`/jogo/${slug}`}>
            {name}
          </Link>
          <p className="text-sm text-amber-500">
            {Array(stars).fill("★").join("")}
          </p>
        </div>
      </header>
      <div className="mt-3 text-sm text-[#949494]">{review}</div>
    </div>
  );
}

export default Reviews;
