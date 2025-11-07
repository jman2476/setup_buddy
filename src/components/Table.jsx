import { useState, useEffect, useRef } from 'react'

function Table({ number,shape,tableObj  }) {
    const [offset, setOffSet] = useState({ x: 0, y: 0 })
    const [tableState, setTableState] = useState(tableObj)
    // const [styles, setStyles] = useState({})
    const startRef = useRef({ x: 0, y: 0 })
    const mouseRef = useRef({ x: 0, y: 0 })
    const styles = { //need to make this change based on shape
      position: "absolute",
          top: `${offset.y + 100 * number}px`,
          left: `${offset.x + 100 * number}px`,
          height: `${tableObj.diameter}px`,
          width: `${tableObj.diameter}px`,
          lineHeight: `${tableObj.diameter}px`,
          fontSize: ' 200%'
    }
    console.log(tableObj.shape, tableObj.diameter)
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
      // handleStyles()
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
    
    // Map tableObj properties onto styles
    const handleStyles = () => {
      switch (tableObj.shape) {
        case 'circle':
          buildCircle()
          break;
        case 'rectangle':
          break;
        case 'square':
          break;
      }
    }
    
    // styles.current = {
    //   position: "absolute",
    //       top: `${offset.y + 100 * number}px`,
    //       left: `${offset.x + 100 * number}px`,
    //       height: `${tableObj.length}px`,
    //       width: `${tableObj.width}px`,
    //       lineHeight: `60px`,
    //       fontSize: ' 200%'
    // }
    console.log(styles.current)
    const buildCircle = () => {
      return styles
    }
    const buildLong = () => {

    }
    const buildSquare = () => {

    }



    return (
      <>
        <div
          draggable={true}
          tabIndex={0}
          className={`table-obj ${tableObj.shape}`}
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          style={styles}
        >{number}
        </div>
      </>
    )
  }

  export default Table