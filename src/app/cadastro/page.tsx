// component
import { FormRegister } from '@/components/Form/FormRegister'

// next components
import Image from 'next/image'

// imagem
import logo from '@/assets/logo.svg'

const Register = () => {


  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <Image className='mx-auto mb-4' src={logo} width={300} height={106} alt='Logo pizzaria' />
      <FormRegister/>
    </div>
  )
}

export default Register
