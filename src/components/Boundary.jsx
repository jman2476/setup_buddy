import { useRef, useState } from "react"
import { findCOM, findCOMCoord } from "../methods/collision"

function Boundary({ children, rotatedPoints }) {

   const [pointList, setPointList] = useState([])
   const editBoundRef = useRef(false)
   const [boundaryToggle, setBoundaryToggle] = useState(false)
   const pointCounter = useRef(1)
   const [rotPointList, setRotPointList] = useState(rotatedPoints[0])
   const [sqrPointList, setSqrPointList] = useState(rotatedPoints[1])
   const [linPointList, setLinPointList] = useState(rotatedPoints[2])

   const handleEditButton = () => {
      try {
         editBoundRef.current = !editBoundRef.current
         setBoundaryToggle(!boundaryToggle)
      } catch (error) {
         console.log(error)
      }
   }

   const handleResetButton = () => {
      try {
         setPointList([])
         setRotPointList([])
         setSqrPointList([])
         setLinPointList([])
         pointCounter.current = 1
      } catch (error) {
         console.log(error)
      }
   }

   const handleShowRotationButton = () => {
      try {
         setRotPointList(rotatedPoints[0])
         setSqrPointList(rotatedPoints[1])
         setLinPointList(rotatedPoints[2])
      } catch (error) {

      }
   }
   // if editBoundRef===true, click field to create points
   const handleSetBound = (event) => {
      try {
         if (!event.target.className.includes('boundary')
            &&!event.target.className.includes('canvas')) return
         const divRect = document.getElementById('boundary')?.getBoundingClientRect()
         if (editBoundRef.current) {
            const mousePosition = {
               x: event.clientX - divRect.x,
               y: event.clientY - divRect.y
            }
            pointCounter.current++
            setPointList(arr => [...arr, mousePosition])
         } else {
            throw new Error('Boundary edit is toggled off')
         }
      } catch (error) {
         console.log(error)
      }
   }

   const handleTestBorder = () => {
      try {
         // Line
         // const testVertices = [{x: 400, y: 500}, {x: 700, y: 500}]
         // Diamond
         // const testVertices = [{ x: 700-300, y: 400-300 }, { x: 800-300, y: 700-300 }, { x: 500-300, y: 800-300 }, { x: 400-300, y: 500-299 }]
         // Square
         const testVertices = [{ x: 100, y: 100 }, { x: 800, y: 100 }, { x: 800, y: 300 }, { x: 100, y: 300 }]
         // Square
         // const testVertices = [{ x: 100, y: 100 }, { x: 500, y: 100 }, { x: 500, y: 500 }, { x: 100, y: 500 }]
         // Triangle
         // const testVertices = [{ x: 400, y: 100 }, { x: 400, y: 500 }, { x: 400+200*Math.sqrt(3), y: 300 }]
         // Pentagon
         const c1 = Math.cos(Math.PI * 2 / 5) * 200
         const c2 = Math.cos(Math.PI / 5) * 200
         const s1 = Math.sin(Math.PI * 2 / 5) * 200
         const s2 = Math.sin(Math.PI * 4 / 5) * 200
         // const testVertices = [{x: 300,y: 500},{x: s1+300,y: c1+300 },{x: s2+300,y: -1*c2+300},{x: -1*s2+300,y: -1*c2+300},{x: -1*s1+300,y: c1+300}]
         setPointList(testVertices)
      } catch (error) {
         console.log('Test Boundary error', error)
      }
   }

   function COMPoint({ points }) {
      const divRect = document.getElementById('boundary')?.getBoundingClientRect()
      const vertices = document.getElementsByClassName('boundary-vertex')
      const center = findCOMCoord(points)
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${center.y}px`,
                  left: `${center.x}px`
               }}
               className="center-point">y:{Math.floor(center.y)}, x:{Math.floor(center.x)}</div>
         </>
      )
   }

   // Can create points, but the offset is wrong
   // needs to be adjusted to account for the 
   // Boundary component position
   function BoundaryPoint({ positionObj, num }) {
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${positionObj.y}px`,
                  left: `${positionObj.x}px`
               }}
               className="boundary-vertex vertex">{num} y:{Math.floor(positionObj.y)}, x:{Math.floor(positionObj.x)}</div>
         </>
      )
   }

   function RotatedPoint({ positionObj, num }) {
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${positionObj.y}px`,
                  left: `${positionObj.x}px`
               }}
               className="rotation-vertex vertex">__{num} y:{Math.floor(positionObj[1] ?? positionObj.y)}, x:{Math.floor(positionObj[0] ?? positionObj.x)}</div>
         </>
      )
   }

   function SquarePoint({ positionObj, num }) {
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${positionObj.y}px`,
                  left: `${positionObj.x}px`
               }}
               className="sqr-vertex vertex">__{num}</div>
         </>
      )
   }

   function LinePoint({ positionObj, num }) {
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: `${positionObj.y}px`,
                  left: `${positionObj.x}px`
               }}
               className="line-vertex vertex">__{num} </div>
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
               top: '35px',
               right: '-130px',
               width: '170px',
               height: '40px',
               fontSize: '12pt'
            }}
            onClick={handleShowRotationButton}
         >Show rotations</button>
         <button
            style={{
               position: 'absolute',
               top: '70px',
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
            style={{
               zIndex: -1
            }}
         >
            <canvas id='canvas'
               className="canvas"
               height={600}
               width={1140}></canvas>
            {editBoundRef.current ? 'Editable' : ''}
            {pointList?.map((obj, index) => {
               return (
                  <BoundaryPoint
                     positionObj={obj}
                     key={index + 'point'}
                     num={index} />
               )
            })}
            {rotPointList?.map((obj, index) => {
               return (
                  <RotatedPoint
                     positionObj={obj}
                     key={index + 'point'}
                     num={index} />
               )
            })}
            {sqrPointList?.map((obj, index) => {
               return (
                  <SquarePoint
                     positionObj={obj}
                     key={index + 'sqr'}
                     num={index} />
               )
            })}
            {linPointList?.map((obj, index) => {
               return (
                  <LinePoint
                     positionObj={obj}
                     key={index + 'line'}
                     num={index} />
               )
            })}
            <COMPoint points={pointList}
            />
            <div
               style={{
                  position: 'absolute',
                  top: '0px',
                  left: '250px',
                  color: 'ghostwhite'
               }}
               className="vertex">250
            </div>
            <div
               style={{
                  position: 'absolute',
                  top: '0px',
                  left: '500px',
                  color: 'ghostwhite'
               }}
               className="vertex">500
            </div>
            <div
               style={{
                  position: 'absolute',
                  top: '0px',
                  left: '750px',
                  color: 'ghostwhite'
               }}
               className="vertex">750
            </div>
            <div
               style={{
                  position: 'absolute',
                  top: '0px',
                  left: '1000px',
                  color: 'ghostwhite'
               }}
               className="vertex">1000
            </div>
            <div
               style={{
                  position: 'absolute',
                  top: '500px',
                  left: '0px',
                  color: 'ghostwhite'
               }}
               className="vertex">500
            </div>
            <div
               style={{
                  position: 'absolute',
                  top: '250px',
                  left: '0px',
                  color: 'ghostwhite'
               }}
               className="vertex">250
            </div>
            {children}
         </div>
      </>
   )
}

export default Boundary