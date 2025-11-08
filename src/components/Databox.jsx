import { useState, useEffect, useRef } from 'react'
import { RoundTable,LongTable,SquareTable } from '../models/table.jsx'

function DataBox({table}){
    const [inputs, setInputs] = useState()


    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        // setTableList(event.target.value)
        console.log('Value updated')
      }
    }

    return(
      <>
        <input className={'input'}
          type="number"
          defaultValue={60} 
          onKeyDown={handleKeyDown}>
          </input> 
        <input className={'input'}
          type="number"
          defaultValue={60} 
          onKeyDown={handleKeyDown}>
          </input>   
      </>
    )
  }

  export default DataBox