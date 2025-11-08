import { useState, useEffect, useRef } from 'react'
import { RoundTable,LongTable,SquareTable } from '../models/table.jsx'

function DataBox({tableObj}){
    const inputs = useRef([])

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        // setTableList(event.target.value)
        console.log('Value updated')
        switch (tableObj.shape) {
        case 'circle':
            tableObj.diameter = event.target.value
            break;
        case 'rectangle':
            tableObj.length = event.target.value
            tableObj.width = event.target.value
            break;
        case 'square':
            tableObj.side = event.value.target
          break;
      }
      console.log(tableObj)
      }
    }

    // Set the default values for input
    (()=>{
        switch (tableObj.shape) {
        case 'circle':
            inputs.current = [tableObj.diameter]
            break;
        case 'rectangle':
            inputs.current = [tableObj.length, tableObj.width]
            break;
        case 'square':
            inputs.current = [tableObj.side]
          break;
      }
    })()

    return(
      <>
        Width
        <input className={'input'}
          type="number"
          defaultValue={inputs.current[0]} 
          onKeyDown={handleKeyDown}>
          </input> 
        Length
        <input className={'input'}
          type="number"
          defaultValue={inputs.current[1]?? 0} 
          onKeyDown={handleKeyDown}>
          </input>   
      </>
    )
  }

  export default DataBox