import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [mouse, setMouse] = useState({x:0,y:0})
  const [offset, setOffSet] = useState({x:0,y:0})
  const [start, setStart] = useState({x:0,y:0})
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
    console.log('drag start', start, startRef.current)
  }
  
  const dragEnd = (event) => {
    console.log(mouse.x,mouse.y)
    mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      }
    setOffSet(prev => ({
      x: prev.x + mouseRef.current.x - startRef.current.x,
      y: prev.y + mouseRef.current.y - startRef.current.y
    }))
    console.log(start, offset)
  }

  return (
    <>
      <div id="toolbar">
          <h2 className='title'>Toolbar Time</h2>
          <p>MouseRef postion x: {mouseRef.current.x}, y: {mouseRef.current.y}</p>
          <p>startRef postion x: {startRef.current.x}, y: {startRef.current.y}</p> 
          <p>Offset postion x: {offset.x}, y: {offset.y}</p> 
          <p></p>
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
                    left: `${offset.x+10}px`}}
                  ></div>
          </div>
      </div>
    </>
  )
}

export default App
