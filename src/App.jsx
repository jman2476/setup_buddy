import { useState } from 'react'
import './App.css'

function App() {
  const [mouse, setMouse] = useState({x:0,y:0})
  const [offset, setOffSet] = useState({x:10,y:10})
  const [start, setStart] = useState({x:0,y:0})
  
  document.addEventListener('mousemove', handleMouse)

  function handleMouse(event) {
    setMouse({
      x: event.clientX,
      y: event.clientY
    })
  }

  function dragStart () {
    setStart({
      x: mouse.x,
      y: mouse.y
    })
    console.log('drag start', start)
  }


  function dragHandler (event) {
    handleMouse(event)
  }

  function dragEnd () {
    console.log(mouse.x,mouse.y)
    setOffSet({
      dx: mouse.x - start.x,
      dy: mouse.y - start.y
    })
    console.log(start, offset)
  }

  return (
    <>
      <div id="toolbar">
          <h2 className='title'>Toolbar Time</h2>
          <p>Mouse postion</p>
          <p>x: {mouse.x}, y: {mouse.y}</p>
      </div>
      <div id="setup">
          <h2 className='title setup'>Your setup here:</h2>
          <div id='setup-area' >
              <div 
                  draggable={true}
                  className='table-obj'
                  onDragStart={dragStart}
                  onDrag={dragHandler}
                  onDragEnd={dragEnd}
                  style={{
                    position: "relative",
                    top: `${offset.y}px`,
                    left: `${offset.x}px`}}
                  ></div>
          </div>
      </div>
    </>
  )
}

export default App
