import Link from "next/link";
import Card from "./components/card";
import LargeCard from "./components/largeCard";
import SmallCard from "./components/smallCard";

export default function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto mt-8">
        <div>
          <p className="text-sm">OFERTAS ESPECIAIS</p>
          <div className="w-full h-96 grid-cols-3 grid gap-4 mt-4">
            <Card />
            <Card />
            <Card />
          </div>
        </div>

        <div className="mt-20">
          <p className="text-sm">ATÉ R$ 20</p>
          <div className="grid-cols-4 grid gap-4 mt-4">
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
          </div>
        </div>

        <div className="mt-20">
          <p className="text-sm">TODOS OS JOGOS</p>
          <div className="flex flex-col items-center gap-2 mt-4">
            <LargeCard />
            <LargeCard />
            <LargeCard />
            <LargeCard />
            <LargeCard />
            <LargeCard />
            <LargeCard />
            <LargeCard />
          </div>
        </div>
      </div>
      <footer className="mt-20 gap-4 p-6 text-[#8A939B] bg-black flex items-center justify-center flex-col">
        <p>Entre para começar a jogar!</p>
        <Link href={"/login"} className="flex items-center justify-center font-semibold rounded-sm h-8 w-20 bg-[#5F7904] text-[#C0D870]">Entrar</Link>
        <p>
          Ou, <Link href={"/register"} className="text-white">crie uma conta</Link> e entre na Steem de graça
        </p>
      </footer>
    </>
  );
}
