import Header from "@/components/Header/Header";
import { ReactNode } from "react";

export default function LayoutMain({children} : {children : ReactNode}){
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}