import { useState, useEffect, useRef } from 'react'
import { handleCollision } from '../methods/collision'


function Table({ number, tableObj, onClick, setRotList, circleCount, longCount, squareCount, setChecks  }) {
   const [offset, setOffSet] = useState({ x: -80, y: number * 10 })
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
      try {
         mouseRef.current = {
            x: event.clientX,
            y: event.clientY
         }
         const dummyOffset = {
            x: offset.x + mouseRef.current.x - startRef.current.x,
            y: offset.y + mouseRef.current.y - startRef.current.y
         }
         console.log('%cdummyOffset', 'color:lightred', dummyOffset)
         const [pointsArray, checkBools] = handleCollision(dummyOffset,number)
         setChecks(checkBools)
         console.log('%cShow bool checks:', 'color:dodgerblue', checkBools)
         setRotList(pointsArray)
         if (checkBools.includes(false)) {
            console.log('%cThat cant happen', 'color: mistyrose; background-color:hotpink')
            throw new Error('Can\'t move that table there')
         }
         setOffSet(prev => ({
            x: prev.x + mouseRef.current.x - startRef.current.x,
            y: prev.y + mouseRef.current.y - startRef.current.y
         }))
      } catch (error) {
         console.log(`%c${error}`, 'color:red')
      }
   }

   // If Drag and Drop is screwed up, maybe start with these three functions
   const buildCircle = () => {
      circleCount.current++
      styles.current = {
         position: "absolute",
         top: `${offset.y}px`,
         left: `${offset.x}px`,
         height: `${tableObj.diameter}px`,
         width: `${tableObj.diameter}px`,
         lineHeight: `${tableObj.diameter}px`,
         transform: `rotate(${tableObj.angle}deg)`
      }
      console.log('%cTable coordinates', 'color:violet', styles.current.top, styles.current.left)
      return styles
   }
   const buildLong = () => {
      longCount.current++
      styles.current = {
         position: "absolute",
         top: `${offset.y}px`,
         left: `${offset.x}px`,
         height: `${tableObj.length}px`,
         width: `${tableObj.width}px`,
         lineHeight: `${tableObj.width}px`,
         transform: `rotate(${tableObj.angle}deg)`
      }
      return styles
   }
   const buildSquare = () => {
      squareCount.current++
      styles.current = {
         position: "absolute",
         top: `${offset.y}px`,
         left: `${offset.x}px`,
         height: `${tableObj.side}px`,
         width: `${tableObj.side}px`,
         lineHeight: `${tableObj.side}px`,
         transform: `rotate(${tableObj.angle}deg)`
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
   console.log('%cTable render', 'color: lightgreen;font-size:16px')
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