'use client'
import { CategoryProps } from '@/@types/CategoryProps'
import { ProductProps } from '@/@types/ProductProps'
import { TableProps } from '@/@types/TableProps'
import { Notification } from '@/components/Notifier/Notification'
import { SelectCategory } from '@/components/Select/SelectCategory'
import { SelectProduct } from '@/components/Select/SelectProducts'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import React, { useEffect, useState } from 'react'

const Table = ({params} : {params: {params: string}}) => {

    const id = params.params[0]

    const [table, setTable] = useState<TableProps | null>()
    const [allCategories, setAllCategories] = useState<CategoryProps[]>([])
    const [idCategory, setIdCategory] = useState<string>('')

    const [productId, setProductId] = useState<string>('')
    
    const [productsSelectedByIdCategory, setProductsSelectedByIdCategory] = useState<ProductProps[] | null>()

    const [qtd, setQtd] = useState<number>(1)

    useEffect(() => {
      async function getTable(){
        const response = await api.get(`/api/table`, {
          params: {
            id: id
          }
        })
        setTable(response.data)
      }

      async function getCategories(){
        const response = await api.get('/api/category')
        setAllCategories(response.data)
      }
      getCategories()
      getTable()
      
    },[id])


    useEffect(() => {
      if (idCategory === '') return
      async function getAllProductsByIdCategory(){
        const response = await api.get('/api/product', {
          params: {
            idCategory: idCategory
          }
        })

        setProductsSelectedByIdCategory(response.data)
      }
      getAllProductsByIdCategory()
    },[idCategory])

    useEffect(() => {
      if (isNaN(qtd)) {
        setQtd(1)
      }
    },[qtd])


    async function handleRegisterProductInTable(e : React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      if (!productId || !qtd) return
      try{
        const response = await api.post('/api/order', {
          idTable: table?.idTable,
          idProduct: productId,
          quantity: qtd,
          tableId: table?.id
        })

        Notification('success', 'Produto adicionado com sucesso')
        setProductId('')
        setQtd(1)
      }catch{
        Notification('error', 'Erro ao adicionar produto')
      }
    }

  return (
    <div className='px-8 mt-20 flex flex-col gap-5'>
        <h1 className='text-2xl font-bold'>Mesa {table?.idTable}</h1>
        <div className='flex flex-col gap-4'>
          <SelectCategory placeholder='Selecione a categoria...' category={idCategory} categories={allCategories} setCategory={setIdCategory} />
          {productsSelectedByIdCategory && productsSelectedByIdCategory.length > 0 && (
            <div className='flex flex-col gap-5'>
              <SelectProduct setProduct={setProductId} product={productId} placeholder='Escolha o produto...' products={productsSelectedByIdCategory} />
              <div className='flex gap-4'>
                <p className='w-[50%] text-center font-bold text-xl'>Quantidade</p>
                <input className='w-full py-1.5 rounded-lg text-center text-black' value={qtd} type='number' onChange={(e) => setQtd(parseInt(e.target.value))} />
              </div>
              <div className='flex gap-4'>
                <Button onClick={() => setQtd(qtd + 1)} variant={'secondary'} className='w-[40%] text-white font-bold text-2xl bg-blue-300 rounded-lg flex items-center justify-center'>+</Button>
                <Button onClick={handleRegisterProductInTable} className='w-full bg-green-500 hover:bg-green-900'>Avançar</Button>
              </div>
            </div>
          )}
          {productsSelectedByIdCategory?.length === 0 && <p>Nenhum produto cadastrado nessa categoria</p>}
        </div>
    </div>
  )
}

export default Table
