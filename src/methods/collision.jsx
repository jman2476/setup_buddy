import { Line } from "../models"

function handleCollision(rectangle,offset) {
   try {
      const tables = document.getElementsByClassName('table-obj')
      const vertices = document.getElementsByClassName('boundary-vertex')
      const divRect = document.getElementById('boundary')?.getBoundingClientRect()
      console.log('vertices, handleCollision',vertices)
      const centerOfMass = findCOM(vertices, divRect)
      console.log(centerOfMass, "COM")
      const lines = genBoundaryLine(vertices, centerOfMass)
      if (tables.length > 0) {
         for (let i = 0; i < tables.length; i++) {
            const element = tables.item(i)
            const table = element.getBoundingClientRect()
            const bool = collisionTableLine(table,centerOfMass, lines)
            if(bool) continue
            else return new Error(`Table ${i} is out of bounds`)
         }
      }
   } catch (error) {
      console.log(error)
   }
}

// Take vertices, and build array of line Objects
function genBoundaryLine(vertices, center) {
   try {

      const length = vertices.length
      if (length <= 1) {
         throw new Error('Not enough vertices to draw lines between. Need 2 or more.')
      }
      const vertexArr = [...vertices].map((vertex) => vertex.getBoundingClientRect())
      const resultLines = new Array(length)
      // console.log('genBound vertexArr', vertexArr)
      for (let i = 0; i < length; i++) {
         if (i === length - 1) {//if on last element, connect first and last point
            if (length === 2) continue //can only make one line, so already done
            console.log('last line')
            const pointA = vertexArr[i]
            const pointB = vertexArr[0]
            const midpoint = calcMidpoint(pointA, pointB)
            const direction = { x: center[0] - midpoint.x, y: center[1] - midpoint.y }
            console.log('line direction obj', direction)
            resultLines[i] = new Line(pointA, pointB, direction)
         } else {
            const pointA = vertexArr[i]
            const pointB = vertexArr[i + 1]
            const midpoint = calcMidpoint(pointA, pointB)
            const direction = { x: center[0] - midpoint.x, y: center[1]- midpoint.y }
            console.log('line direction obj', direction, center, midpoint)
            resultLines[i] = new Line(pointA, pointB, direction)
            // check getAngle function
            getAngle(pointA,pointB)
         }
      }
      console.log('genBoundaryLine:',resultLines)
      return resultLines
   } catch (error) {
      console.log('genBoundaryLine error', error)
      return error
   }
}

function collisionTableLine(tableRect, center) {
   //For each of the four points, check that it is 
   // between the line and the COM 
   //Apply rotation matrix to coordinate points to
   // rotate the points about the COM
   // - Rotate about COM by setting COM to origin
   //    then rotate, then readjust points by COM coordinates
    
}

// takes a point object {x,y} and angle theta in radians
function rotateByAngle (point, theta) {
   try {
      const pntArr = [point.x, point.y]
      const rotMatrix = [Math.cos(theta), Math.sin(theta)*-1, Math.sin(theta), Math.cos(theta)] // cos theta   -sin theta/ sin theta cos theta
      const result = [pntArr[0]*rotMatrix[0] + pntArr[1]*rotMatrix[1], pntArr[0]*rotMatrix[3] + pntArr[1]*rotMatrix[4]]
      console.log(result, 'rotated point m')
      return result
   } catch (error) {
      console.error(error)
   }
}

// Get angle needed for rotation
function getAngle(pointA, pointB) {
   try {
      const slope = (pointA.y - pointB.y) / (pointA.x - pointB.x)
      console.log('getAngle, slope, angle', slope, Math.atan(slope))
      return Math.atan(slope)  
   } catch (error) {
      console.log('getSlope error', error)
   }
}

function calcMidpoint(pointA, pointB) {
   console.log('calc midpoint', pointA, pointB)
   return { x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2 }
}


// For finding the Center of Mass based on already rendered components
function findCOM(vertices, divOffset) {
   try {
      const vertexArr = [...vertices]
      const length = vertices.length
      let results = [0, 0] // [x,y]
      const offset = [divOffset.x, divOffset.y]
      for (let item in vertexArr) {
         if (item === 0) continue
         const rect = vertexArr[item].getBoundingClientRect()
         results[0] += rect.x
         results[1] += rect.y
         results[0] -= offset[0]
         results[1] -= offset[1]
      }
      // console.log(results)
      results[0] /= length
      results[1] /= length
      // console.log(results, length)
      return results
   } catch (error) {
      console.log('findCOM error:', error)
      return [0, 0]
   }
}

// For finding the Center of Mass based on vertex coordinates
function findCOMCoord(coordArray) {
   try {
      const center = coordArray.reduce((acc, curr) => {
         acc.x += curr.x
         acc.y += curr.y

         return acc
      }, { x: 0, y: 0 })
      center.x /= coordArray.length
      center.y /= coordArray.length
      // console.log(center, 'findCOMCoord')
      return center
   } catch (error) {
      console.log('findCOMCoord error', error)
      return { x: 0, y: 0 }
   }
}

export { handleCollision, findCOM, findCOMCoord }