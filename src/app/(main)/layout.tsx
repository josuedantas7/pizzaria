import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function LayoutMain({children} : {children : ReactNode}){

  const session = await getServerSession(authOptions)

  if (!session || !session.user){
      redirect('/login')
  }

  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}