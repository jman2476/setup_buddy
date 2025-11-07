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

const tableTypes = [
  {
    shape: 'rectangle',
    w: 2,
    l: 8
  },{
    shape: 'circle',
    d: 8
  },{
    shape: 'rectangle',
    w: 2,
    l: 4
  }
]


function App() {
  const startRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const tableRef = useRef(0)
  const [tableList, setTableList] = useState([])
  
  const dragStart = (event) => {
    startRef.current = {
      x: mouseRef.current.x,
      y: mouseRef.current.y
    }
  }

  // currently depricated
  // see Table()
  function TableRect({number}) {
    const [offset, setOffSet] = useState({ x: 0, y: 0 })
    const [tableSize, setTableSize] = useState(60)
  
    useEffect(() => {
      const handleMouse = (event) => {
        mouseRef.current = {
          x: event.clientX,
          y: event.clientY
        }
      }
      document.addEventListener('mousemove', handleMouse)
      return () => {
        document.removeEventListener('mousemove', handleMouse)
      }
    })

    const dragEnd = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      }
      setOffSet(prev => ({
        x: prev.x + mouseRef.current.x - startRef.current.x,
        y: prev.y + mouseRef.current.y - startRef.current.y
      }))
    }
    return (
      <>
        <div
          draggable={true}
          className='table-obj rectangle'
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          style={{
            position: "absolute",
            top: `${offset.y + 15 * number}px`,
            left: `${offset.x + 30 * number}px`,
            height: `${tableSize}px`,
            width: `${tableSize}px`,
            lineHeight: `${tableSize}px`,
            fontSize: ' 200%'
          }}
        >{number}R</div>
      </>
    )
  
  }

  // function DataBox({table}){
  //   const [inputs, setInputs] = useState()


  //   const handleKeyDown = (event) => {
  //     if (event.key === 'Enter') {
  //       // setTableList(event.target.value)
  //       console.log('Value updated')
  //     }
  //   }

  //   return(
  //     <>
  //       <input className={'input'}
  //         type="number"
  //         defaultValue={60} 
  //         onKeyDown={handleKeyDown}>
  //         </input> 
  //       <input className={'input'}
  //         type="number"
  //         defaultValue={60} 
  //         onKeyDown={handleKeyDown}>
  //         </input>   
  //     </>
  //   )
  // }

  function Table({ number,shape }) {
    const [offset, setOffSet] = useState({ x: 0, y: 0 })
    const [tableSize, setTableSize] = useState(60)
    const [focus, setFocus] = useState(false)

    const handleTableResize = (event) => {
      let newSize = tableSize
      if (newSize > 100) newSize = 100
      if (newSize < 40) newSize = 40
      setTableSize(newSize)
      console.log(tableSize)

    }


    useEffect(() => {
      const handleMouse = (event) => {
        mouseRef.current = {
          x: event.clientX,
          y: event.clientY
        }
      }
      document.addEventListener('mousemove', handleMouse)
      return () => {
        document.removeEventListener('mousemove', handleMouse)
      }
    })

    const dragEnd = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      }
      setOffSet(prev => ({
        x: prev.x + mouseRef.current.x - startRef.current.x,
        y: prev.y + mouseRef.current.y - startRef.current.y
      }))
    }
    const handleFocus = (event) => {
      setFocus(!focus)
      console.log(focus)
    }

    return (
      <>
        <div
          draggable={true}
          tabIndex={0}
          className={`table-obj ${shape}`}
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          onFocus={handleFocus}
          onBlur={handleFocus}
          style={{
            position: "absolute",
            top: `${offset.y + 100 * number}px`,
            left: `${offset.x + 100 * number}px`,
            height: `${tableSize}px`,
            width: `${tableSize}px`,
            lineHeight: `${tableSize}px`,
            fontSize: ' 200%'
          }}
        >{number}
        </div>
      </>
    )
  }

  const tableMaker = (event) => {
    const tShape = tableRef.current%2 === 0? 'circle' : 'rectangle'
    const newTable = <Table number={tableRef.current} shape={tShape} key={tableRef.current} callback={dragStart} mouse={mouseRef}/>
    setTableList(arr => [...arr, newTable])
    tableRef.current++
    console.log(tableRef.current)
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
        {/* <h2 className='title setup'>Your setup here:</h2> */}
        <div id='setup-area' >
          {tableList}
        </div>
      </div>
    </>
  )
}

export default App
