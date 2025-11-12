import { useState, useEffect, useRef } from 'react'
import { RoundTable, LongTable, SquareTable } from '../models/table.jsx'

function DataBox({ count,tableComp, tList, setTList, updateTable}) {
  const inputs = useRef([])
  const [inputBoxes, setInputBoxes] = useState([])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      console.log('Value updated')
      
      console.log('Data to change',event.target)
      const value = event.target.value
      //call update table
      updateTable(event, tableComp, value)
    }
  }

  const renderData = () => {
    try {
      const obj = tableComp?.props?.tableObj
      const keys = Object.keys(tableComp?.props?.tableObj)
      console.log("Render data",keys,obj)
      const arr = []
      for (let item in keys){
        const prop = keys[item]
        const box = <DataInput key={item} field={prop} value={obj[prop]}/>
        console.log(keys[item], obj)
        arr.push(box)
      }
      console.log(...arr)
      inputs.current = arr
      // setInputBoxes(arr)
  } catch (err) {
    console.log('No tables yet')
    console.log('renderData error:', err)
  }
  }

  useEffect(()=>{
    renderData()
  })

  function DataInput ({ field,value }) {
    return (
      <>
        {`${field}`}
        <input 
          className='input'
          // type="number" 
          name={`${field}`}
          id={`${field}`}
          onKeyDown={e=>handleKeyDown(e)}
          defaultValue={value}
          />
      </>
    )
  }

  return (
    <>
      {/* Width
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
      </input> */}
      <DataInput
        field={'length'}
        value={60}/>
      {inputs.current.length ? inputs.current :<> </>}

      <button
        className='button'
        onKeyDown={handleKeyDown}>Update</button>
    </>
  )
}

export default DataBox