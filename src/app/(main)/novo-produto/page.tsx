import { FormRegisterProduct } from '@/components/Form/FormRegisterProduct'
import React from 'react'

const NewProduct = () => {
  return (
    <div className='w-[50%] mx-auto'>
      <div className='flex flex-col gap-3 mt-12'>
        <h1 className='text-white font-bold text-2xl'>Novo produto</h1>
        <FormRegisterProduct/>
      </div>
    </div>
  )
}

export default NewProduct
