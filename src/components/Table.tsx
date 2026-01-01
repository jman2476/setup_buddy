import { useState, useEffect, useRef } from 'react'
import { handleCollision } from '../methods/collision'
import { RoundTable, LongTable, SquareTable, Point } from '../models'

interface TableProps {
   number: number
   tableObj: RoundTable | LongTable | SquareTable
   onClick: React.MouseEventHandler<HTMLDivElement>
   setRotList: React.Dispatch<React.SetStateAction<Point[][]>>
   circleCount: { current: number }
   longCount: { current: number }
   squareCount: { current: number }
   setChecks: React.Dispatch<React.SetStateAction<boolean[]>>
   scale: number
}


function Table({ number, tableObj, onClick, setRotList, circleCount, longCount, squareCount, setChecks, scale }: TableProps) {
   const [offset, setOffSet] = useState<Point>({ x: -80, y: number * 10 })
   const styles = useRef<React.CSSProperties>({})
   const startRef = useRef<Point>({ x: 0, y: 0 })
   const mouseRef = useRef<Point>({ x: 0, y: 0 })

   // dragStart, dragEnd and the useEffect between are 
   // what handle the drag and drop functionality
   const dragStart = () => {
      startRef.current = {
         x: mouseRef.current.x,
         y: mouseRef.current.y
      }
   }
   const dragEnd = (event: React.DragEvent<HTMLDivElement>) => {
      try {
         mouseRef.current = {
            x: event.clientX,
            y: event.clientY
         }
         const dummyOffset = {
            x: offset.x + mouseRef.current.x - startRef.current.x,
            y: offset.y + mouseRef.current.y - startRef.current.y
         }
         const [pointsArray, checkBools] = handleCollision(dummyOffset, number)
         setChecks(checkBools)
         setRotList(pointsArray)
         if (checkBools.includes(false)) {
            console.log('%c', '')
            throw new Error('That can\'t happen. Can\'t move that table there')
         }
         setOffSet(prev => ({
            x: prev.x + mouseRef.current.x - startRef.current.x,
            y: prev.y + mouseRef.current.y - startRef.current.y
         }))
      } catch (error) {
         console.log(`%c${error}`, 'color: mistyrose; background-color:hotpink; border:11px dotted red;')
      }
   }
   useEffect(() => {
      const handleMouse = (event: MouseEvent) => {
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

   // If Drag and Drop is screwed up, maybe start with these three functions
   const buildCircle = () => {
      if (tableObj instanceof RoundTable) {
         circleCount.current++
         styles.current = {
            position: "absolute",
            top: `${offset.y*scale}px`,
            left: `${offset.x*scale}px`,
            height: `${tableObj.diameter*scale}px`,
            width: `${tableObj.diameter*scale}px`,
            lineHeight: `${tableObj.diameter*scale}px`,
            transform: `rotate(${tableObj.angle*scale}deg)`
         }
         return styles
      }
   }
   const buildLong = () => {
      if (tableObj instanceof LongTable) {
         longCount.current++
         styles.current = {
            position: "absolute",
            top: `${offset.y*scale}px`,
            left: `${offset.x*scale}px`,
            height: `${tableObj.length*scale}px`,
            width: `${tableObj.width*scale}px`,
            lineHeight: `${tableObj.width*scale}px`,
            transform: `rotate(${tableObj.angle*scale}deg)`
         }
         return styles
      }
   }
   const buildSquare = () => {
      if (tableObj instanceof SquareTable) {
         squareCount.current++
         styles.current = {
            position: "absolute",
            top: `${offset.y*scale}px`,
            left: `${offset.x*scale}px`,
            height: `${tableObj.side*scale}px`,
            width: `${tableObj.side*scale}px`,
            lineHeight: `${tableObj.side*scale}px`,
            transform: `rotate(${tableObj.angle*scale}deg)`
         }
         return styles
      }
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