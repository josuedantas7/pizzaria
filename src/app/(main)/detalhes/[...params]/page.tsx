import React from 'react'

const DetailsOrderId = ({params} : {params: {params: string}}) => {

    const id = params.params[0]

  return (
    <div>
        Page Detalhes Pedido: {id}
    </div> 
  )
}

export default DetailsOrderId
