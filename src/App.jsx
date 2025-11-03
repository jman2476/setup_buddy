import { useState, useEffect, useRef } from 'react'
import './App.css'

// TODO: make all tables into an array

function App() {
  const startRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const [tableList, setTableList] = useState([])
  const tableRef = useRef(3)
  
  const dragStart = (event) => {
    startRef.current = {
      x: mouseRef.current.x,
      y: mouseRef.current.y
    }
  }

  function TableRect({number}) {
    const startRef = useRef({ x: 0, y: 0 })
    const mouseRef = useRef({ x: 0, y: 0 })
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
  
    // const dragStart = (event) => {
    //   startRef.current = {
    //     x: mouseRef.current.x,
    //     y: mouseRef.current.y
    //   }
    // }
  
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
          className='table-obj'
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          style={{
            position: "absolute",
            top: `${offset.y + 15 * number}px`,
            left: `${offset.x + 30 * number}px`,
            height: `${tableSize}px`,
            width: `${tableSize}px`,
            lineHeight: `${tableSize}px`,
            borderRadius: 50,
            fontSize: ' 200%'
          }}
        >{number} Rectangle</div>
      </>
    )
  
  }

  function Table({ number }) {
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
        {/* Prototype Round Table */}
        {/* <div 
            draggable={true}
            className='table-obj'
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            style={{
              position: "absolute",
              top: `${offset.y+10}px`,
              left: `${offset.x+10}px`,
              height: `${tableSize}px`,
              width: `${tableSize}px`,
              lineHeight: `${tableSize}px`,
              fontSize:' 200%'
              }}
              >1</div> */}
        <div
          draggable={true}
          className='table-obj'
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          style={{
            position: "absolute",
            top: `${offset.y + 100 * number}px`,
            left: `${offset.x + 100 * number}px`,
            height: `${tableSize}px`,
            width: `${tableSize}px`,
            lineHeight: `${tableSize}px`,
            fontSize: ' 200%'
          }}
        >{number}</div>
      </>
    )
  }

  // const dragEnd = (event) => {
  //   mouseRef.current = {
  //       x: event.clientX,
  //       y: event.clientY
  //     }
  //   setOffSet(prev => ({
  //     x: prev.x + mouseRef.current.x - startRef.current.x,
  //     y: prev.y + mouseRef.current.y - startRef.current.y
  //   }))
  // }
  const tableMaker = (event) => {
    const tableKey = `Table ${tableRef.current}`
    console.log('table key:', tableKey)
    let newTable = <Table number={tableRef} key={tableKey} />
    arrayOne.push(newTable)
    setTableList((prev) => [...prev, <Table number={tableRef.current} key={tableRef.current} />])
    tableRef.current += 1
    console.log(tableList)
  }


  const arrayOne = [
    <Table number={3} key='1'/>,
    <Table number={4} key='2'/>,
    <Table number={5} key='3'/>,
    <TableRect number={6} key='4'/>
  ]

  console.log(arrayOne, 'arrayOne'
  )
  
  return (
    <>
      <div id="toolbar">
        <h2 className='title'>Toolbar Time</h2>
        {/* <input className="input" type="number" value={tableSize} onChange={e=>setTableSize(e.target.value)}/> */}
      </div>
      <div id="setup">
        <h2 className='title setup'>Your setup here:</h2>
        <div id='setup-area' >
          <button
            onClick={tableMaker}
          >Make new table</button>
          <Table number={1} />
          <Table number={2} />
          {tableList}
          {arrayOne}
        </div>
      </div>
    </>
  )
}

export default App
