import { useState, useEffect, useRef } from 'react'
import './App.css'
import { TableCon, RoundTable, LongTable, SquareTable } from "./models/"
import { DataBox, Table } from './components'

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
  const [tableObjList, setTableObjList] = useState([])
  const [focusTable, setFocusTable] = useState({})
  const [dataState, setDataState] = useState(0)
  const [inputList, setInputList] = useState([])
  const keyRandomizer = useRef([])
  const listRef = useRef([])

  const setKeyRand = () => {
    keyRandomizer.current = Math.floor(Math.random() * 15)
  }

  const tableMaker = (event) => {
    const newShape = event.target.previousElementSibling.value
    const newTableObj = TableCon.make(newShape)
    setTableObjList(arr => [...arr, newTableObj])
    const newTable = <Table
      number={tableRef.current}
      tableObj={newTableObj}
      key={tableRef.current}
      onClick={e => tableSelect(e)}
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

  const genTest1 = () => {
    let obj = {
      target: {
        previousElementSibling: {
          value: 'circle'
        }
      }
    }
    tableMaker(obj)
    obj.target.previousElementSibling.value = 'rectangle'
    tableMaker(obj)
    obj.target.previousElementSibling.value = 'square'
    tableMaker(obj)
  }
  // TODO: write function to update table component
  // take the componenent from the listRef array
  // change that component, then use listRef array
  // to rewrite the tableList array
  const tableUpdate = () => {
    try {
      const table = focusTable.props.tableObj
      console.log(table)
      const keys = Object.keys(table)
      const newVals = []
      for (let i in keys) {
        const element = document.getElementsByName(keys[i])
        newVals.push(element[0].value)
      }
      const newTableObj = TableCon.make(...newVals)
      const index = tableDelete()
      const updateTable = <Table
        number={index}
        tableObj={newTableObj}
        key={index}
        onClick={e => tableSelect(e)}
      />
      listRef.current[index] = updateTable
      setTableList([...listRef.current])
    } catch (err) {
      console.log('tableUpdate error:', err)
      console.log('Make sure to select a table first')
    }
  }

  // currently deletes a table by setting its 
  // array[index] to an empty div.
  // NOTE: Only meant for updating tables, not fully removing
  //        Use tableAnnihilate instead
  const tableDelete = () => {
    try {
      const number = focusTable.props.number
      listRef.current[number] = <></>
      setTableList(listRef.current)
      return number
    } catch (err) {
      console.log(err)
    }
  }

  const tableAnnihilate = () => {
    try {

    } catch (err) {
      console.log(err)
    }
  }

  const renderData = (target) => {
    try {
      const obj = target.props.tableObj
      const keys = Object.keys(obj)
      setKeyRand()
      const arr = []
      for (let item in keys) {
        const prop = keys[item]
        const box = <DataBox
          key={item + tableRef.current * keyRandomizer.current}
          field={prop}
          value={obj[prop]}
        />
        arr.push(box)
      }
      setInputList(arr)
    } catch (err) {
      console.log('No tables yet')
      console.log('renderData error:', err)
    }
  }

  console.log('App render')
  return (
    <>
      <div id="toolbar">
        <h2 className='title'>Toolbar Time</h2>
        <div id='databox' >
          <label htmlFor="">New table2 shape</label>
          <select name="newTableDrop" id="newTableDrop">
            <option value="circle">Round</option>
            <option value="rectangle">Long</option>
            <option value="square">Square</option>
          </select>
          <button
            onClick={tableMaker}
          >Make new table</button>
          <button
            onClick={genTest1}
          >Test 1: Table types</button>
          {inputList.length ? inputList : <div />}
          <button
            onClick={tableUpdate}
          >Update table</button>
          <button
            onClick={tableDelete}
          >Delete table</button>

        </div>
      </div>
      <div id="setup">
        <div id='setup-area' >
          {tableList.length ? tableList : <div />}
        </div>
      </div>
    </>
  )
}

export default App
