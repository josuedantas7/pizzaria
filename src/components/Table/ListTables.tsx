'use client'
import { TableProps } from '@/@types/TableProps';
import { api } from '@/lib/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ModalShowDetailTable } from '../Modal/ModalShowDetailTable';

export function ListTables() {

  const [allTables, setAllTables] = useState<TableProps[] | null>(null);

  useEffect(() => {
    async function getTables(){
      const response = await api.get('/api/table');
      setAllTables(response.data);
    }
    getTables();
  },[]);

  return (
    <div className='flex flex-col gap-4'>
      {!allTables ? (
        <h1>Carregando...</h1>
      ) : (allTables.length > 0 ? (
        allTables.map((table) => (
          <ModalShowDetailTable table={table} key={table.id}>
            <div className='bg-[#101026] rounded'>
              <div className='rounded flex h-[35px]'>
                <div className='w-[7px] bg-green-500 rounded-l'></div>
                <div className='px-4 flex items-center'>
                  <p className='font-normal'>Mesa <span className='font-semibold'>{table.idTable}</span></p>
                </div>
              </div>
            </div>
          </ModalShowDetailTable>
        ))
      ) : (
        <h1>Não há mesas cadastradas</h1>
      ))}
    </div>
  );
}
