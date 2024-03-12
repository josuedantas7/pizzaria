import { TableProps } from "@/@types/TableProps"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { ReactNode } from "react"
import { Notification } from "../Notifier/Notification"
import { useRouter } from "next/navigation"
  
  export function ModalShowDetailTable({children, table} : { children: ReactNode, table: TableProps }) {

    const router = useRouter()

    async function handleCloseTable(){
        try{
            const response = await api.delete('/api/table', {
                params: {
                    id: table.id
                }
            })
            router.replace('/pedidos')
            router.refresh()
            Notification('success', 'Pedido concluído com sucesso')
        }catch{
            Notification('error', 'Erro ao concluir pedido')
        }
    }

    function formatNumber(value: number | undefined | null){
        if (!value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(0)
        }
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <button>
                {children}
            </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#1D1D2E]">
          <AlertDialogHeader>
            <AlertDialogTitle>Detalhes do pedido</AlertDialogTitle>
            <div>
              <div>
                <h1 className="text-lg">Mesa: <span className="font-bold">{table.idTable}</span></h1>
              </div>
              <div>
                {table.Order?.OrderProduct.map((orderProduct,index) => (
                    <div className="flex gap-2" key={orderProduct.id}>
                        <p className="font-bold">{orderProduct.quantity}</p>
                        <p>-</p>
                        <p className="text-[#3FFFA3] font-semibold">{orderProduct.Product.name}</p>
                    </div>
                ))}
                {!table.Order && (
                    <p className="mt-6">Não há pedidos</p>
                )}
                {table.Order && table.Order?.OrderProduct.length > 0 && (
                    <div className="flex gap-2">
                        <p className="font-bold">Valor total: </p>
                        <p className="text-[#3FFFA3] font-semibold">{formatNumber(table.Order?.OrderProduct.reduce((total, data) => total + (data.quantity * data.Product.price), 0))}</p>
                    </div>
                )}
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseTable} className="bg-red-500">Concluir pedido</AlertDialogCancel>
            <AlertDialogAction>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  