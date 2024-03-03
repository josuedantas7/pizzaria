import React from 'react'

const Table = ({params} : {params: {params: string}}) => {

    const id = params.params[0]

  return (
    <div>
        Page Mesa: {id}
    </div>
  )
}

export default Table
