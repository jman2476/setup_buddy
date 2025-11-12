import { useState, useEffect, useRef } from 'react'
import { RoundTable, LongTable, SquareTable } from '../models/table.jsx'

function DataBox({ field, value }) {
  // // opt-out of auto-memoization
  'use no memo'
  // handle the state in this 
  const dimension = useRef()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      console.log('Value updated')

      console.log('Data to change', event.target)
      const val = event.target.value
      //call update table
    }
  }
  const handleChange = (e) => {
    dimension.current = e.target.value
    console.log(dimension.current)
  }

  // check if new props or passed
  // or if old args are used
  console.log('Render DataBox', field, value)

  if (field === 'shape') {
    console.log('cheese it worked cirlces')
    return (
      <>
        Current {`${field} = ${value}`}
          <select name="shape" defaultValue={`${value}`}>
            <option value="circle">Round</option>
            <option value="rectangle">Long</option>
            <option value="square">Square</option>
          </select>
      </>
    )
  } else {
    return (
      <>
        {`${field} = ${value}`}
        <input
          className='input'
          type="number"
          name={`${field}`}
          id={`${field}`}
          onKeyDown={e => handleKeyDown(e)}
          onChange={(e => handleChange(e))}
          defaultValue={value}
        />
      </>
    )

  }

}

export default DataBox