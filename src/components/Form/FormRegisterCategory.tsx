'use client'
import React, { useState } from 'react'
import { InputPrimary } from '../Input/InputPrimary'
import { Button } from '../ui/button'

export function FormRegisterCategory() {

    const [name, setName] = useState<string>('')


    async function handleRegisterCategory(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {

    };


  return (
    <form className='flex flex-col gap-3' onSubmit={handleRegisterCategory}>
        <InputPrimary type='text' onChange={setName} placeholder='Digite o nome da categoria' />
        <Button variant={'secondary'} className='w-full' onClick={handleRegisterCategory}>Cadastrar</Button>    
    </form>
  )
}
