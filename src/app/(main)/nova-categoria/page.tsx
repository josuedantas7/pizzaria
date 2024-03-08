import { FormRegisterCategory } from '@/components/Form/FormRegisterCategory'
import React from 'react'

const NewCategory = () => {
  return (
    <div className='w-[50%] mx-auto'>
      <div className='flex flex-col gap-3 mt-12'>
        <h1 className='text-white font-bold text-2xl'>Nova categoria</h1>
        <FormRegisterCategory/>
      </div>
    </div>
  )
}

export default NewCategory
