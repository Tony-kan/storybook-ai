import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-purple-500 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 pb-10">
          <Image src="/images/logo2.png" height={250} width={250} alt="Logo" />
          <Button asChild className="px-20nbg-purple-700 p-10 text-xl">
            <Link href="/stories">Explore Story Library</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
