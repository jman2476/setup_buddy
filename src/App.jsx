import { useState, useContext, useRef } from 'react'
import './App.css'
import { TableCon, RoundTable, LongTable, SquareTable } from "./models/"
import { DataBox, Table, Boundary } from './components'


// TODO:: Add boundaries to the setup area
//      - Make Boundary component
//        - Identify vertices in blueprint
//        - Use these points for collision
//        - Check Table position compared to points
//        - Make consistent size independent of window size
//          - Can scale to screen, but not stretch in any dimension

function App() {
   const tableRef = useRef(0)
   const [tableList, setTableList] = useState([])
   const [focusTable, setFocusTable] = useState({})
   const [inputList, setInputList] = useState([])
   const keyRandomizer = useRef([])
   const listRef = useRef([])
   const [rotatedList, setRotatedList] = useState([])
   const [cCount, lCount, sqCount] = [useRef(0), useRef(0), useRef(0)]

   // const TablePosContext = createContext(tablePosList)

   const setKeyRand = () => {
      keyRandomizer.current = Math.floor(Math.random() * 15)
   }

   const tableMaker = (event) => {
      const newShape = event.target.previousElementSibling.value
      const newTableObj = TableCon.make(newShape)
      const newTable = <Table
         number={tableRef.current}
         tableObj={newTableObj}
         key={tableRef.current}
         onClick={e => tableSelect(e)}
         setRotList={setRotatedList}
         squareCount={sqCount}
         longCount={lCount}
         circleCount={cCount}
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
      console.log(listRef.current[index])
   }

   const tableUpdate = () => {
      try {
         const table = focusTable.props.tableObj
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
            setRotList={setRotatedList}

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
   // NOTE: Do not create a new table with the same key
   //        unless you are updating that table
   const tableDelete = () => {
      try {
         const number = focusTable.props.number
         listRef.current[number] = <></>
         setTableList(listRef.current)
         return number
      } catch (error) {
         console.log(error)
      }
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
      } catch (error) {
         console.log('No tables yet')
         console.log('renderData error:', error)
      }
   }
   console.log('App render', rotatedList)

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
               {/* <TablePositionContext value={tablePosList}> */}
               <Boundary rotatedPoints={rotatedList}>
                  {tableList.length ? tableList : <div />}
               </Boundary>
               {/* </TablePositionContext> */}
            </div>
         </div>
      </>
   )
}

export default App
