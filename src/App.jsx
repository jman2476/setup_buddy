import { useState, useEffect, useRef } from 'react'
import './App.css'
import {TableCon, RoundTable, LongTable, SquareTable}  from "./models/"
import {DataBox, Table} from './components'

// TODO: Refactor object handling
//      - Pass table object to Table and DataBox DONE
//      - Handle table object in Table with useState DONE
//      - Handle table object in DataBox with useState DONE
//      - New Table button --> becomes its own component // Nope
//        - can create round, rectangle or square table
//        - table is created with default dimensions only 

function App() {
  const tableRef = useRef(0)
  const [tableList, setTableList] = useState([])
  const [focusTable, setFocusTable] = useState({})
  const [dataState, setDataState] = useState(0)
  const inputs = useRef([])
  const listRef = useRef([])
  
  const tableMaker = (event) => {
    const newShape = event.target.previousElementSibling.value 
    const newTableObj = TableCon.make(newShape)
    const newTable = <Table 
        number={tableRef.current} 
        tableObj={newTableObj} 
        key={tableRef.current}
        onClick={e=>tableSelect(e)}
        />
    setTableList(arr => [...arr, newTable]) 
    listRef.current.push(newTable)
    tableRef.current++
    setFocusTable(newTable)
  }

  const tableSelect = (e) => {
    const index = e.target.innerText
    setFocusTable(listRef.current[index])
    renderData(listRef.current[index])
    console.log('table click', index, dataState)

  }

  // TODO: write function to update table component
  // take the componenent from the listRef array
  // change that component, then use listRef array
  // to rewrite the tableList array
  const tableUpdate = () => {
    try {
      const table = focusTable.props.tableObj
      const keys = Object.keys(table)
      const index = focusTable.key
      const newVals = []
      for (let i in keys) { 
        const element = document.getElementsByName(keys[i])
        // console.log(element, element[0].value)
        newVals.push(element[0].value)
      }
      console.log(TableCon.make(...newVals),'new table')
      // console.log(table, 'table key')
      // console.log(focusTable, listRef.current[index])
      setTableList(listRef.current)
    } catch (err) {
      console.log('tableUpdate error:', err)
    }
  }

  const renderData = (target) => {
    try {
      const obj = target.props.tableObj
      // console.log(obj,'target')
      const keys = Object.keys(obj)
      // console.log("Render data",keys,obj)
      const arr = []
      for (let item in keys){
        const prop = keys[item]
        let box
        console.log(typeof prop, prop, obj[prop], 'check')
        if (prop === 'shape') {
          box = <>
            <label htmlFor="">Current table shape</label>
            <select name="shape" id="curTableDrop" defaultValue={`${obj.shape}`}>
              <option value="circle">Round</option>
              <option value="rectangle">Long</option>
              <option value="square">Square</option>
            </select>
          </>
          
        } else {
          box = <DataBox 
            key={item} 
            field={prop} 
            value={obj[prop]}
            />
        }
        console.log(keys[item], obj)
        arr.push(box)
      }
      // console.log(...arr)
      inputs.current = arr
  } catch (err) {
    console.log('No tables yet')
    console.log('renderData error:', err)
  }
  }

  return (
    <>
      <div id="toolbar">
        <h2 className='title'>Toolbar Time</h2>
        <div id='databox' >
          <label htmlFor="">New table shape</label>
          <select name="newTableDrop" id="newTableDrop">
            <option value="circle">Round</option>
            <option value="rectangle">Long</option>
            <option value="square">Square</option>
          </select>
          <button
            onClick={tableMaker}
          >Make new table</button>
          {inputs.current.length? inputs.current : <div />}
          <button
            onClick={tableUpdate}
          >Update table</button>
        </div>
      </div>
      <div id="setup">
        <div id='setup-area' >
          {tableList.length ? tableList : <div/>}
        </div>
      </div>
    </>
  )
}

export default App
