import { useState, useRef, type ReactElement, } from 'react'
import './App.css'
import { TableCon, Point, RoundTable, LongTable, SquareTable, RealTableLong, RealTableRound, RealTableSquare, RealTableCon } from "./models"
import { DataBox, Table, Boundary } from './components'
import { cleanNumInput, scaler } from './methods'
import type { RealTable, FakeEvent } from './models'


function App() {
   const tableRef = useRef<number>(0)
   const [tableList, setTableList] = useState<React.ReactElement[]>([])
   const [rTList, setRTList] = useState<RealTable[]>([])
   const [focusTable, setFocusTable] = useState<React.ReactElement<any>>(<div />)
   const [inputList, setInputList] = useState<React.ReactElement[]>([])
   const keyRandomizer = useRef<number>(0)
   const listRef = useRef<React.ReactElement[]>([])
   const [rotatedList, setRotatedList] = useState<Point[][]>([])
   const [cCount, lCount, sqCount] =
      [useRef<number>(0), useRef<number>(0), useRef<number>(0)]
   const [checks, setChecks] = useState<boolean[]>([])
   const [scale, setScale] = useState<number>(1)

   const setKeyRand = () => {
      keyRandomizer.current = Math.floor(Math.random() * 15)
   }


   // Moving towards only using realTableMaker
   const tableMaker = (event: React.MouseEvent<HTMLButtonElement> | FakeEvent) => {
      const target = event.target as HTMLElement
      const sibling = target.previousElementSibling as HTMLSelectElement
      const newShape = sibling.value
      const newTableObj = TableCon.make(newShape)
      const newTable = <Table
         number={tableRef.current}
         tableObj={newTableObj}
         key={tableRef.current}
         onClick={e => tableSelect(e)}
         setRotList={setRotatedList}
         setChecks={setChecks}
         squareCount={sqCount}
         longCount={lCount}
         circleCount={cCount}
         scale={scale}
      />
      setTableList(arr => [...arr, newTable])
      listRef.current.push(newTable)
      tableRef.current++
      setFocusTable(newTable)
   }

   const realTableMaker = (event: React.MouseEvent<HTMLButtonElement> | FakeEvent) => {
      const target = event.target as HTMLElement
      const sibling = target.previousElementSibling as HTMLSelectElement
      const newShape = sibling.value
      const newTableObj = RealTableCon.make(newShape)
      const newTable = <Table
         number={tableRef.current}
         tableObj={newTableObj.alias}
         key={tableRef.current}
         onClick={e => tableSelect(e)}
         setRotList={setRotatedList}
         setChecks={setChecks}
         squareCount={sqCount}
         longCount={lCount}
         circleCount={cCount}
         scale={scale}
      />
      newTableObj.component = newTable
      // still need to set RT list, listRef, and tableRef
      setRTList(arr => [...arr, newTableObj]) //List of RealTable Objects
      setTableList(arr => [...arr, newTable]) //List of Table components
      listRef.current.push(newTable)
      tableRef.current++
      setFocusTable(newTable)
      console.log('Real table object:', newTableObj)
   }

   const tableSelect = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement
      const text = target.innerText as string
      const index = Number(text)
      setFocusTable(listRef.current[index])
      renderData(listRef.current[index])
      console.log(listRef.current[index])
   }

   // Needs to be patched to update RealTable list as well
   const tableUpdate = () => {
      try {
         const table = focusTable.props.tableObj
         const keys = Object.keys(table)
         const newVals: string[] = [] as any
         for (let i in keys) {
            const element = document.getElementsByName(keys[i]) as NodeListOf<HTMLSelectElement>
            newVals.push(element[0].value)
         }
         const newTableObj = TableCon.remake(newVals) as RoundTable | LongTable | SquareTable
         const index = tableDelete()
         const updateTable = <Table
            number={index}
            tableObj={newTableObj}
            key={index}
            onClick={e => tableSelect(e)}
            setRotList={setRotatedList}
            setChecks={setChecks}
            squareCount={sqCount}
            longCount={lCount}
            circleCount={cCount}
            scale={scale}
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
         const number: number = focusTable.props.number
         listRef.current[number] = <></>
         setTableList(listRef.current)
         return number
      } catch (error) {
         console.log('tableDelete error:', error)
         return -1
      }
   }

   const handleScale = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLElement
      const sibling = target.previousElementSibling as HTMLSelectElement
      cleanNumInput(sibling.value)
      const newScale = cleanNumInput(sibling.value) as number
      if (newScale > 0) {
         setScale(newScale)
         scaler(scale, newScale, [rTList, []])
      }
   }

   const genTest1 = () => {
      const obj: FakeEvent = {
         target: {
            previousElementSibling: {
               value: 'circle'
            } as HTMLSelectElement
         } as any
      }
      tableMaker(obj)
      obj.target.previousElementSibling.value = 'rectangle'
      tableMaker(obj)
      obj.target.previousElementSibling.value = 'square'
      tableMaker(obj)
   }

   const renderData = (target: React.ReactElement<any>) => {
      try {
         const obj = target.props.tableObj as RoundTable | LongTable | SquareTable
         const keys = Object.keys(obj)
         setKeyRand()
         const arr: React.ReactElement[] = []
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

   // debug console dump
   // console.log('%cReal Tables', "color: green" ,rTList)
   // console.log('%cTable List', 'color:blue', ...tableList)

   return (
      <>
         <div id="toolbar">
            <h2 className='title'> Setup Buddy
               <img src="./table.svg" alt="The glorious table of snacking" height={'80px'} width={'80px'} />
            </h2>

            <div id='check-vals'>

               {checks.map(val => {
                  if (val) return (<div style={{ color: 'chartreuse' }}>{`${val}`}</div>)
                  else return (<div style={{ color: 'crimson' }}>{`${val}`}</div>)
               })}
            </div>
            <div className='databox'>
               <input type="number"
                  name="scale-factor"
                  id="scale-factor"
                  placeholder='1.0'
                  step={0.1} />
               <button
                  onClick={handleScale}
               >Update Scale</button>
            </div>

            <div id='databox' >
               <label htmlFor="">New table shape</label>
               <select name="newTableDrop" id="newTableDrop">
                  <option value="circle">Round</option>
                  <option value="rectangle">Long</option>
                  <option value="square">Square</option>
               </select>
               <button
                  onClick={realTableMaker}
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
               <Boundary rotatedPoints={rotatedList} scale={scale}>
                  {tableList.length ? tableList : <div />}
               </Boundary>
            </div>
         </div>
      </>
   )
}

export default App
