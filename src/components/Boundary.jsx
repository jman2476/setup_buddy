import { useRef, useState } from "react"
import { findCOM, findCOMCoord } from "../methods/collision"

function Boundary({ children }) {
   const [pointList, setPointList] = useState([])
   const editBoundRef = useRef(false)
   const [boundaryToggle, setBoundaryToggle] = useState(false)
   const pointCounter = useRef(1)

   const handleEditButton = () => {
      editBoundRef.current = !editBoundRef.current
      setBoundaryToggle(!boundaryToggle)
      console.log(editBoundRef.current)

   }

   const handleResetButton = () => {
      try {
         setPointList([])
         pointCounter.current = 1

      } catch (error) {
         console.log(error)
      }
   }

   // if editBoundRef===true, click field to create points
   const handleSetBound = (event) => {
      try {
         const divRect = document.getElementById('boundary')?.getBoundingClientRect()
         if (editBoundRef.current) {
            const mousePosition = {
               x: event.clientX - divRect.x,
               y: event.clientY - divRect.y
            }
            console.log(mousePosition, 'click')
            pointCounter.current++
            setPointList(arr => [...arr, mousePosition])
            // test to locate 0,0
         } else {
            throw new Error('Boundary edit is toggled off')
         }
      } catch (error) {
         console.log(error)
      }
   }

   const handleTestBorder = () => {
      try {
         
         const testVertices = [{ x: 100, y: 100 }, { x: 500, y: 100 },
         { x: 500, y: 500 }, { x: 100, y: 500 }
         ]
         setPointList(testVertices)
      } catch (error) {
         console.log('Test Boundary error', error)
      }

   }

   function COMPoint({ points }) {
      const divRect = document.getElementById('boundary')?.getBoundingClientRect()
      const vertices = document.getElementsByClassName('boundary-vertex')
   // const position = useRef(findCOM(vertices, divRect))
   // console.log('COMPoint component', position)
      const center = findCOMCoord(points)
      console.log('COMCoordPoint', center)
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${center.y}px`,
                  left: `${center.x}px`
               }}
               className="center-point"></div>
         </>
      )
   }

   // Can create points, but the offset is wrong
   // needs to be adjusted to account for the 
   // Boundary component position
   function BoundaryPoint({ positionObj }) {
      // console.log(positionObj, 'point position')
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${positionObj.y}px`,
                  left: `${positionObj.x}px`
               }}
               className="boundary-vertex"></div>
         </>
      )
   }

   return (
      <>
         <button
            style={{
               position: 'absolute',
               top: '-50px',
               right: '-130px',
               width: '160px',
               height: '40px',
               fontSize: '12pt'

            }}
            onClick={handleTestBorder}
            className={''}
         >Set test border</button>
         <button
            style={{
               position: 'absolute',
               top: '-5px',
               right: '-130px',
               width: '160px',
               height: '40px',
               fontSize: '12pt'

            }}
            onClick={handleEditButton}
            className={''}
         >Edit boundaries</button>
         <button
            style={{
               position: 'absolute',
               top: '40px',
               right: '-130px',
               width: '170px',
               height: '40px',
               fontSize: '12pt'
            }}
            onClick={handleResetButton}
         >Reset boundaries</button>
         <div
            onClick={e => handleSetBound(e)}
            className="boundary"
            id="boundary"
         > {editBoundRef ? 'Editable' : ''}
            {pointList?.map((obj, index) => {
               // console.log(obj, 'point obj')
               return (
                  <BoundaryPoint
                     positionObj={obj}
                     key={index + 'point'} />
               )
            })}
            <COMPoint points={pointList} />
            {children}
         </div>
      </>
   )
}

export default Boundary