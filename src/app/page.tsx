import Link from "next/link";
import Card from "./components/card";
import LargeCard from "./components/largeCard";
import Navbar from "@/components/navbar";
import { listGames } from "@/lib/db/game";
import { getLastGameReviews } from "@/lib/db/purchase";
import Reviews from "./components/reviews";

export default async function Home() {
  const games = await listGames(1);
  const ofertas = games
    .filter(({ activePromo }) => activePromo > 0)
    .slice(0, 3);

  const lastReviews = (await getLastGameReviews()).slice(0, 6);

  return (
    <>
      <Navbar page="loja" />
      <div className="max-w-4xl mx-auto mt-8">
        <div>
          <p className="text-sm">OFERTAS ESPECIAIS</p>
          <div className="w-full grid-cols-3 grid gap-4 mt-4">
            {ofertas.map(({ name, photoUrl, slug, price, activePromo }) => (
              <Link key={slug} href={`/jogo/${slug}`}>
                <Card
                  name={name}
                  photo={photoUrl}
                  price={price}
                  promo={activePromo}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-sm uppercase">Últimos Reviews</p>
          <div className="grid-cols-3 grid gap-4 mt-4">
            {lastReviews.map(({ _id, game, review, stars }) => (
              <Reviews
                id={_id.toString()}
                name={game.name}
                photoUrl={game.photoUrl}
                review={review}
                stars={stars}
                slug={game.slug}
                key={_id}
              />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="text-sm">TODOS OS JOGOS</p>
          <div className="flex flex-col items-center gap-2 mt-4">
            {games.map(
              ({
                id,
                name,
                description,
                photoUrl,
                price,
                activePromo,
                slug,
              }) => (
                <Link className="w-full" key={slug} href={`/jogo/${slug}`}>
                  <LargeCard
                    key={id}
                    name={name}
                    description={description}
                    photo={photoUrl}
                    price={price}
                    promo={activePromo}
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <footer className="mt-20 gap-4 p-6 text-[#8A939B] bg-black flex items-center justify-center flex-col">
        <p>Entre para começar a jogar!</p>
        <Link
          href={"/login"}
          className="flex items-center justify-center font-semibold rounded-sm h-8 w-20 bg-[#5F7904] text-[#C0D870]"
        >
          Entrar
        </Link>
        <p>
          Ou,{" "}
          <Link href={"/register"} className="text-white">
            crie uma conta
          </Link>{" "}
          e entre na Steem de graça
        </p>
      </footer>
    </>
  );
}
