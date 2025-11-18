import { useState, useEffect, useRef } from 'react'
import { handleCollision } from '../methods/collision'


function Table({ number, tableObj, onClick, setPosList, circleCount, longCount, squareCount }) {
   const [offset, setOffSet] = useState({ x: 0, y: 0 })
   // const [tableState, setTableState] = useState(tableObj)
   const styles = useRef(null)
   const startRef = useRef({ x: 0, y: 0 })
   const mouseRef = useRef({ x: 0, y: 0 })
   const [flip, setFlip] = useState(false)
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
      handleCollision()
      setOffSet(prev => ({
         x: prev.x + mouseRef.current.x - startRef.current.x,
         y: prev.y + mouseRef.current.y - startRef.current.y
      }))
   }

   //Supposed to rotate the table, but currently not functional
   const handleDoubleClick = () => {
      if (tableObj.shape === 'rectangle') {
         const newWidth = styles.current.height
         const newHeight = styles.current.width
         styles.current = {
            position: "absolute",
            top: `${offset.y + 100 * number}px`,
            left: `${offset.x + 100 * number}px`,
            height: newHeight,
            width: newWidth,
            lineHeight: `${tableObj.width}px`,
         }
         console.log('double click', flip, styles.current)
         console.log(newHeight, newWidth)
         setFlip(!flip)
      }
   }

   // If Drag and Drop is screwed up, maybe start with these three functions
   const buildCircle = () => {
      circleCount.current++
      styles.current = {
         position: "absolute",
         top: `${offset.y - 5 * circleCount.current}px`,
         left: `${offset.x - 5 * circleCount.current - 50}px`,
         height: `${tableObj.diameter}px`,
         width: `${tableObj.diameter}px`,
         lineHeight: `${tableObj.diameter}px`,
      }

      return styles
   }
   const buildLong = () => {
      longCount.current++
      styles.current = {
         position: "absolute",
         top: `${offset.y - 5 * longCount.current + 200}px`,
         left: `${offset.x - 5 * longCount.current - 20}px`,
         height: `${tableObj.length}px`,
         width: `${tableObj.width}px`,
         lineHeight: `${tableObj.width}px`,
      }
      return styles
   }
   const buildSquare = () => {
      squareCount.current++
      styles.current = {
         position: "absolute",
         top: `${offset.y - 5 * squareCount.current + 400}px`,
         left: `${offset.x - 5 * squareCount.current - 50}px`,
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
   console.log('%cTable render', 'color: lightgreen')
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
            onDoubleClick={handleDoubleClick}
         >{number}
         </div>

      </>
   )
}

export default Table