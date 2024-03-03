import React from 'react'

const CloseTable = ({params} : {params: {params: string}}) => {

    const id = params.params[0]

  return (
    <div>
        Page Finalizar Pedido Mesa: {id}
    </div>
  )
}

export default CloseTable
