import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [offset, setOffSet] = useState({x:0,y:0})
  const [tableSize, setTableSize] = useState(60)
  const startRef = useRef({x:0,y:0})
  const mouseRef = useRef({x:0,y:0})
  
  useEffect(()=>{
    const handleMouse = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      }
    }
    document.addEventListener('mousemove', handleMouse)
    return ()=>{
      document.removeEventListener('mousemove', handleMouse)
    }
  })


  const dragStart = (event) => {
    startRef.current = {
      x: mouseRef.current.x,
      y: mouseRef.current.y
    }
  }
  
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
      <div id="toolbar">
          <h2 className='title'>Toolbar Time</h2>
          <p>MouseRef postion x: {mouseRef.current.x}, y: {mouseRef.current.y}</p>
          <p>startRef postion x: {startRef.current.x}, y: {startRef.current.y}</p> 
          <p>Offset postion x: {offset.x}, y: {offset.y}</p> 
          <p>Table Size: {tableSize}</p>
          <input type="number" value={tableSize} onChange={e=>setTableSize(e.target.value)}/>
      </div>
      <div id="setup">
          <h2 className='title setup'>Your setup here:</h2>
          <div id='setup-area' >
              <div 
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
                    borderRadius: `${tableSize/2}px`
                  }}
                  ></div>
          </div>
      </div>
    </>
  )
}

export default App
