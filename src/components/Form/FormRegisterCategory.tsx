'use client'
import React, { useState } from 'react'
import { InputPrimary } from '../Input/InputPrimary'
import { Button } from '../ui/button'
import { api } from '@/lib/api'
import { Notification } from '../Notifier/Notification'

export function FormRegisterCategory() {

    const [name, setName] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)


    async function handleRegisterCategory(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setLoading(true)
        try{
          await api.post('/api/category', {name})
          Notification('success', 'Categoria cadastrada com sucesso')
        }catch{
          Notification('error', 'Erro ao cadastrar categoria')
        }finally{
          setLoading(false)
          clearLabel()
        }
    };

    function clearLabel(){
      setName('')
    }


  return (
    <form className='flex flex-col gap-3' onSubmit={handleRegisterCategory}>
        <InputPrimary value={name} type='text' onChange={setName} placeholder='Digite o nome da categoria' />
        <Button variant={'secondary'} className='w-full' onClick={handleRegisterCategory}>{!loading ? 'Cadastrar' : "Cadastrando categoria..."}</Button>    
    </form>
  )
}
