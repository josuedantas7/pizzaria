
// next components
import Image from 'next/image'
import Link from 'next/link'

// imagem
import logo from '@/assets/logo.svg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LinkHeaderSignOut } from "../Button/LinkHeaderSignOut";

export default async function Header() {

    const session = await getServerSession(authOptions)

    return (
        <>
            <div className="flex justify-between items-center px-20 max-[500px]:hidden">
                <Link className="hover:scale-110 duration-500 transition-all" href={'/'}>
                    <Image src={logo} alt='Logo pizzaria' width={150} height={70} />
                </Link>
                <div className="flex gap-6 items-center py-4">
                    {session && session.user ? (
                        <div className="flex gap-6 items-center py-4">
                            <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/nova-categoria'}>Nova categoria</Link>
                            <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/novo-produto'}>Novo produto</Link>
                            <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/pedidos'}>Pedidos</Link>
                            <LinkHeaderSignOut/>
                        </div>
                    ): (
                        <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/login'}>Login</Link>
                    )}
                </div>
            </div>
            <div className="max-[500px]:flex justify-center items-center py-4 hidden">
                {session && session.user ? (
                    <div className="flex gap-6 flex-col justify-center items-center py-4">
                        <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/novo-pedido'}>Novo pedido</Link>
                        <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/pedidos'}>Pedidos</Link>
                    </div>
                ): (
                    <Link className="hover:scale-110 duration-500 hover:text-zinc-300 hover:border-b transition-all border-emerald-100" href={'/login'}>Login</Link>
                )}
            </div>
        </>
    )
}
