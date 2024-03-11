'use client'
import React, { useEffect, useState } from 'react'
import { InputPrimary } from '../Input/InputPrimary'
import { Button } from '../ui/button'
import { api } from '@/lib/api'
import { CategoryProps } from '@/@types/CategoryProps'
import { SelectCategory } from '../Select/SelectCategory'
import { ProductProps } from '@/@types/ProductProps'
import { Notification } from '../Notifier/Notification'

export function FormRegisterProduct() {

    const [name, setName] = useState<string>('')
    const [categoryId, setIdCategory] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)

    const [allCategories, setAllCategories] = useState<CategoryProps[]>([])

    async function handleRegisterProduct(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      setLoading(true)

      if (!name || !categoryId || !price || !description) return Notification('error', 'Preencha todos os campos')

      const data : ProductProps = {
        name,
        categoryId,
        price: parseFloat(price),
        description
      }

      try{
        await api.post('/api/product', {...data})
        Notification('success', 'Produto cadastrado com sucesso')
      }catch{
        Notification('error', 'Erro ao cadastrar produto')
      }finally{
        clearLabels()
        setLoading(false)
      }
    };

    function clearLabels(){
      setName('')
      setPrice('')
      setDescription('')
      setIdCategory('')
    }

    useEffect(() => {
        async function getCategories(){
            const response = await api.get('/api/category')
            setAllCategories(response.data)
            console.log(response.data)
        }
        getCategories()
    },[])


  return (
    <form className='flex flex-col gap-3' onSubmit={handleRegisterProduct}>
        <InputPrimary value={name} type='text' onChange={setName} placeholder='Digite o nome do item' />
        <InputPrimary value={price} type='text' onChange={setPrice} placeholder='Valor' />
        <InputPrimary value={description} type='text' onChange={setDescription} placeholder='Descrição' />
        <SelectCategory category={categoryId} placeholder='Selecione a categoria...' categories={allCategories} setCategory={setIdCategory}/>
        <Button variant={'secondary'} className='w-full' onClick={handleRegisterProduct}>{!loading ? "Cadastrar" : "Cadastrando produto..."}</Button>    
    </form>
  )
}
