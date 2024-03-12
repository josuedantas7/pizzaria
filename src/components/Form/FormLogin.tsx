'use client'

// react imports
import React, { useEffect, useState } from 'react'

// imagem
import logo from '@/assets/logo.svg'

// components
import { InputPrimary } from '../Input/InputPrimary'
import { Button } from '../ui/button'
import { Notification } from '../Notifier/Notification'

// next components
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// axios
import { api } from '@/lib/api'
import { signIn, signOut, useSession } from 'next-auth/react'
import { UserLoginProps } from '@/@types/UserLogin'

export function FormLogin() {

    const { data: session, status } = useSession()

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const router = useRouter()

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const data : UserLoginProps = {
            email,
            password
        }

        if (!email || !password) {
            Notification('error','Preencha todos os campos')
        }

        const response = await signIn('credentials', {
            ...data, 
            redirect: false})
        
        if (response?.error){
            Notification('error', 'Email ou senha incorretos!')
        } else{
            Notification('success', 'Login realizado com sucesso!')
            router.replace('/')
            router.refresh()
        }

    }

  return (
    <form onSubmit={handleSubmit} className='w-[500px] flex flex-col gap-3'>
        <InputPrimary value={email} onChange={setEmail} placeholder='Digite seu E-mail' type='email' />
        <InputPrimary value={password} onChange={setPassword} placeholder='Sua senha' type='password' />
        <Button onClick={handleSubmit} variant={'destructive'} className='w-full'>Acessar</Button>
        <Link href={'/cadastro'} className='text-end text-zinc-300 underline'>Registrar minha empresa</Link>
    </form>
  )
}
