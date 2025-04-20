import Link from "next/link";
import React from "react";

interface ReviewProps {
  username: string;
  description: string;
  stars: number;
  id: string;
}

function Reviews({ username, description, stars, id }: ReviewProps) {
  return (
    <div id={id} className="bg-[#171D25] p-4 rounded-sm">
      <header className="flex items-start gap-2.5">
        <div>
          <Link
            className="underline"
            href={`/profile/${username.toLowerCase()}`}
          >
            {username}
          </Link>
          <p className="text-sm text-amber-500">
            {Array(stars).fill("★").join("")}
          </p>
        </div>
      </header>
      <div className="mt-3 text-sm text-[#949494]">{description}</div>
    </div>
  );
}

export default Reviews;
