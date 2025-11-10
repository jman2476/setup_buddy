import { useState, useEffect, useRef } from 'react'
import { RoundTable, LongTable, SquareTable } from '../models/table.jsx'

function DataBox({ tableObj }) {
  const inputs = useRef([])
  const inputBoxs = useRef([])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

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
        case undefined:
          break;
      }
      console.log(tableObj)
    }
  }

  const dataCircle = () => {
    inputBoxs.current.push(<input />)
    console.log(inputBoxs.current,'tatos')
  }

  const dataLong = () => {

  }

  const dataSquare = () => {

  }
  // Set the default values for input
  switch (tableObj?.shape) {
      case 'circle':
        dataCircle()
        break;
      case 'rectangle':
        dataLong()
        break;
      case 'square':
        dataSquare()
        break;
      case undefined:
        dataCircle()
        break;
  }
  dataCircle()
  return (
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
        defaultValue={inputs.current[1] ?? 0}
        onKeyDown={handleKeyDown}>
      </input>
    </>
  )
}

export default DataBox