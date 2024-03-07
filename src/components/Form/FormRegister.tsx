'use client'

// react imports
import React, { useState } from 'react'

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
import { UserLoginProps } from '@/@types/UserLogin'

export function FormRegister() {


    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const router = useRouter()

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const data : UserLoginProps = {
            name,
            email,
            password
        }

        if (!name || !email || !password) {
            Notification('error','Preencha todos os campos')
        }


        try{
            const response = await api.post('/api/user', {...data})
            Notification('success','Usuário criado com sucesso')
            console.log(response.data)
            router.push('/login')
        }catch{
            Notification('error','Erro ao criar usuário')
        }

        console.log(data)
    }

  return (
    <form className='w-[500px] flex flex-col gap-3' onSubmit={handleSubmit}>
        <InputPrimary onChange={setName} placeholder='Digite o nome da sua empresa' type='text' />
        <InputPrimary onChange={setEmail} placeholder='Digite seu E-mail' type='email' />
        <InputPrimary onChange={setPassword} placeholder='Sua senha' type='password' />
        <Button onClick={handleSubmit} variant={'destructive'} className='w-full'>Acessar</Button>
        <Link href={"/login"} className='text-end text-zinc-300 underline'>Já possuo uma conta</Link>
    </form>
  )
}
