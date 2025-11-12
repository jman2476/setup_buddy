import { useState, useEffect, useRef } from 'react'
import { RoundTable, LongTable, SquareTable } from '../models/table.jsx'

function DataBox({ field, value}) {
  // handle the state in this 
  const def = useRef()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      console.log('Value updated')
      
      console.log('Data to change',event.target)
      const val = event.target.value
      //call update table
    }
  }
  const handleChange = (e) => {
    def.current = e.target.value
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
        onChange={(e=>handleChange(e))}
        defaultValue={value}
        />
    </>
  )
}

export default DataBox