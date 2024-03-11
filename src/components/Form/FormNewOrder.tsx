'use client'
import React, { useState } from 'react'
import { InputPrimary } from '../Input/InputPrimary'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Notification } from '../Notifier/Notification'

export function FormNewOrder() {

    const [table, setTable] = useState<string>('')
    const router = useRouter()

    function handleRedirectTable(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!table || table === '') return Notification('error', 'Preencha o campo mesa')
        router.push(`/mesa/${table}`)
    }

  return (
    <form className='flex flex-col gap-3' onSubmit={handleRedirectTable}>
        <InputPrimary value={table} onChange={setTable} type='text' placeholder='Nome da mesa' />
        <Button variant={'outline'} className='w-full text-green-800' onClick={handleRedirectTable}>Abrir menu</Button>
    </form>
  )
}
