import { useState, useEffect, useRef } from 'react'

function Table({ number, tableObj, onClick }) {
  const [offset, setOffSet] = useState({ x: 0, y: 0 })
  // const [tableState, setTableState] = useState(tableObj)
  const styles = useRef(null)
  const startRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  // dragStart, dragEnd and the useEffect between are 
  // what handle the drag and drop functionality
  const dragStart = (event) => {
    startRef.current = {
      x: mouseRef.current.x,
      y: mouseRef.current.y
    }
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
  

  const buildCircle = () => {
    styles.current = {
      position: "absolute",
      top: `${offset.y + 100 * number}px`,
      left: `${offset.x + 100 * number}px`,
      height: `${tableObj.diameter}px`,
      width: `${tableObj.diameter}px`,
      lineHeight: `${tableObj.diameter}px`,
    }
    return styles
  }
  const buildLong = () => {
    styles.current = {
      position: "absolute",
      top: `${offset.y + 100 * number}px`,
      left: `${offset.x + 100 * number}px`,
      height: `${tableObj.length}px`,
      width: `${tableObj.width}px`,
      lineHeight: `${tableObj.width}px`,
    }
    return styles
  }
  const buildSquare = () => {
    styles.current = {
      position: "absolute",
      top: `${offset.y + 100 * number}px`,
      left: `${offset.x + 100 * number}px`,
      height: `${tableObj.side}px`,
      width: `${tableObj.side}px`,
      lineHeight: `${tableObj.side}px`,
    }
    return styles
  }

  switch (tableObj.shape) {
    case 'circle':
      buildCircle()
      break;
    case 'rectangle':
      buildLong()
      break;
    case 'square':
      buildSquare()
      break;
  }

  return (
    <>
      <div
        draggable={true}
        tabIndex={0}
        className={`table-obj ${tableObj.shape}`}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        style={styles.current}
        onClick={onClick}
      >{number}
      </div>

    </>
  )
}

export default Table