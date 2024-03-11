import { FormNewOrder } from '@/components/Form/FormNewOrder'
import React from 'react'

const NewOrder = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>
      <h1 className='text-center text-2xl font-bold mb-4'>Novo pedido</h1>
      <div className='w-[85%]'>
        <FormNewOrder />
      </div>
    </div>
  )
}

export default NewOrder
