import { useState, useEffect, useRef } from 'react'
import './App.css'
import {RoundTable, LongTable, SquareTable}  from "./models/table.jsx"
import DataBox from './components/Databox.jsx'
import Table from './components/Table.jsx'
// TODO: Show div with details on table highlight
// Should have:
//    - height and width for rectangle
//    - radius for circle
//    - adjustable values
//    - change shape of table
//    - delete button
//    - lock values button

function App() {
  const tableRef = useRef(0)
  const [tableList, setTableList] = useState([])
  
  const round = new RoundTable('circle', 80)
  const long = new LongTable('rectangle', 80, 40)


  const tableMaker = (event) => {
    const tShape = tableRef.current%2 === 0? 'circle' : 'rectangle'
    const newTable = <Table number={tableRef.current} shape={tShape} tableObj={round} key={tableRef.current}/>
    setTableList(arr => [...arr, newTable])
    tableRef.current++
    console.log(tableRef.current, newTable)
  }

  return (
    <>
      <div id="toolbar">
        <h2 className='title'>Toolbar Time</h2>
        <div id='databox' >
          <button
            onClick={tableMaker}
          >Make new table</button>
          <DataBox />
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
