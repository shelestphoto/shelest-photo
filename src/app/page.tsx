import Link from "next/link";


import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  
  const session = await getServerAuthSession();

  

  return (
    <HydrateClient>
      <main >
        Меня зовут Игнат

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-xs text-white">
                {session && <span>Вы зашли как {session.user?.email}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Выйти" : "Войти"}
              </Link>
            </div>
          
      </main>
    </HydrateClient>
  );
}
