import { useState, useEffect, useRef } from 'react'
import { RoundTable, LongTable, SquareTable } from '../models/table.jsx'

function DataBox({ field, value}) {


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      console.log('Value updated')
      
      console.log('Data to change',event.target)
      const val = event.target.value
      //call update table
    }
  }

  return (
    <>
      {`${field}`}
      <input 
        className='input'
        type="number" 
        name={`${field}`}
        id={`${field}`}
        onKeyDown={e=>handleKeyDown(e)}
        defaultValue={value}
        />
    </>
  )
}

export default DataBox