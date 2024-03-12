import { ListTables } from '@/components/Table/ListTables'
import React from 'react'

const Order = () => {
  return (
    <div className='w-[50%] mx-auto'>
      <div className='flex flex-col gap-3 mt-12'>
        <h1 className='text-white font-bold text-2xl'>Pedidos</h1>
        <ListTables />
      </div>
    </div>
  )
}

export default Order
