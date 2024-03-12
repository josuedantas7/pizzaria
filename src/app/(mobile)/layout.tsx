import Header from "@/components/Header/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

export default async function LayoutMobile({children} : {children : ReactNode}){

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