import Header from "@/components/Header/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session || !session?.user) {
    redirect('/login')
  } else {
    redirect('/pedidos')
  }

  return (
    <main>
      <Header />
    </main>
  );
}
