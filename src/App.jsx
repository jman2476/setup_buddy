import { useState, useEffect, useRef } from 'react'
import './App.css'
import {TableCon, RoundTable, LongTable, SquareTable}  from "./models/"
import {DataBox, Table} from './components'

// TODO: Refactor object handling
//      - Pass table object to Table and DataBox DONE
//      - Handle table object in Table with useState
//      - Handle table object in DataBox with useState
//      - New Table button --> becomes its own component
//        - can create round, rectangle or square table
//        - table is created with default dimensions only 

function App() {
  const tableRef = useRef(0)
  const [tableList, setTableList] = useState([])
  
  const round = new RoundTable('circle', 80)
  const long = new LongTable('rectangle', 80, 40)


  const tableMaker = (event) => {
    const newShape = event.target.previousElementSibling.value 
    const newTableObj = TableCon.make(newShape)
    // console.log(newTableObj)
    // const tShape = tableRef.current%2 === 0? 'circle' : 'rectangle'
    const newTable = <Table number={tableRef.current} tableObj={newTableObj} key={tableRef.current}/>
    setTableList(arr => [...arr, newTable])
    tableRef.current++
    // console.log(tableRef.current, newTable)
    // console.log(event.target.previousElementSibling.value, 'potato')
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
          <DataBox tableObj={round}/>
        </div>
      </div>
      <div id="setup">
        <div id='setup-area' >
          {tableList}
        </div>
      </div>
    </>
  )
}

export default App
