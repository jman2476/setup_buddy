import { Line } from "../models"

function handleCollision(rectangle,) {
   try {
      const tables = document.getElementsByClassName('table-obj')
      const vertices = document.getElementsByClassName('boundary-vertex')
      const divRect = document.getElementById('boundary')?.getBoundingClientRect()
      console.log('vertices, handleCollision', vertices)
      const centerOfMass = findCOM(vertices, divRect)
      console.log(centerOfMass, "COM")
      const lines = genBoundaryLine(vertices, centerOfMass, divRect)
      // debugging rotation here
      const rotatedPoints = []
      for (let i = 0; i < vertices.length; i++) {
         const vertex = vertices.item(i).getBoundingClientRect()
         const vAngle = getVertexAngle(vertex, centerOfMass, divRect)
         console.log('%cCheck vertex angle func', 'color:cyan ', vAngle, vAngle*180/Math.PI)
         console.log('%cvertex', 'color:lightblue',i, vertex)
         const rotVertex = rotateByAngle({ x: vertex.x - divRect.x, y: vertex.y - divRect.y }, -1*vAngle, centerOfMass)
         rotatedPoints.push(rotVertex)
      }
      console.log('%cRotated points', 'color:cyan', ...rotatedPoints)
      return rotatedPoints


      if (tables.length > 0) {
         // for (let i = 0; i < tables.length; i++) {
         const element = tables.item(0)
         const table = element.getBoundingClientRect()
         const bool = collisionTableLine(table, centerOfMass, lines)
         console.log('bool', bool)
         if (bool) return [...bool, ...rotatedPoints]
         else return new Error(`Table ${i} is out of bounds`)
         // }
      }
   } catch (error) {
      console.log('handleCollision error',error)
   }
}

// Rewrite logic to rotate by vertex point

// get angle between vertex and origin
function getVertexAngle (point, center, offset) {
   try {
      // console.log(point,center,offset)
      const adjCenter = center
      const adjPoint = {x:point.x - offset.x, y:point.y - offset.y}
      console.log('gVA', [point.x,point.y], center, [offset.x, offset.y], [adjPoint.x, adjPoint.y])
      const ray = new Line(adjPoint, center)
      return ray.angle
   } catch (error) {
      console.log('getVertexAngle error',error)
   }
   
}








// Take vertices, and build array of line Objects
function genBoundaryLine(vertices, center, offset) {
   try {
      const length = vertices.length
      if (length <= 1) {
         throw new Error('Not enough vertices to draw lines between. Need 2 or more.')
      }
      const vertexArr = [...vertices].map((vertex) => vertex.getBoundingClientRect())
      const resultLines = new Array(length)
      for (let i = 0; i < length; i++) {
         vertexArr[i].x -= offset.x
         vertexArr[i].y -= offset.y
      }
      for (let i = 0; i < length; i++) {
         if (i === length - 1) {//if on last element, connect first and last point
            if (length === 2) continue //can only make one line, so already done
            const midpoint = calcMidpoint(vertexArr[i], vertexArr[0])
            const direction = { x: center[0] - midpoint.x, y: center[1] - midpoint.y }
            resultLines[i] = new Line(vertexArr[i], vertexArr[0], direction)
         } else {
            const midpoint = calcMidpoint(vertexArr[i], vertexArr[i + 1])
            const direction = { x: center[0] - midpoint.x, y: center[1] - midpoint.y }
            resultLines[i] = new Line(vertexArr[i], vertexArr[i + 1], direction)
         }
      }
      return resultLines
   } catch (error) {
      console.log('genBoundaryLine error', error)
      return error
   }
}

function collisionTableLine(tableRect, center, lines) {
   //For each of the four points, check that it is 
   // between the line and the COM 
   //Apply rotation matrix to coordinate points to
   // rotate the points about the COM
   // - Rotate about COM by setting COM to origin
   //    then rotate, then readjust points by COM coordinates
   console.log('%ccollisionTableLine props', 'color: red', tableRect, center, lines)
   const numLines = lines.length
   const rotatedList = []

   for (let i = 0; i < numLines; i++) {
      console.log('%cMidpoints debug', 'color:salmon', i)
      const angle = Math.atan(1 / lines[i].slope)
      const direction = lines[i].direction
      const tangle = lines[i].angle
      const tableCorner = [tableRect.x - center.x, tableRect.y - center.y]
      const midpoint = lines[i].midpoint
      console.log('%cCollision angle, direction, x/y', 'color: seagreen', angle, angle * 180 / Math.PI, direction, tableCorner, tangle, tangle * 180 / Math.PI)

      const points = rotateByAngle(midpoint, angle, center)
      // const points = rotateByAngle(midpoint, 0, center)
      rotatedList.push(points)
   }
   return rotatedList
}



// takes a point object {x,y} and angle theta in radians
function rotateByAngle(point, theta, center) {
   try {
      console.log(point, 'point')
      const pntArr = [point.x - center.x, point.y - center.y]
      const rotMatrix = [Math.cos(theta), Math.sin(theta) * -1, Math.sin(theta), Math.cos(theta)] // cos theta   -sin theta/ sin theta cos theta
      const result = [pntArr[0] * rotMatrix[0] + pntArr[1] * rotMatrix[1], pntArr[0] * rotMatrix[2] + pntArr[1] * rotMatrix[3]]

      // console.log('%ccos', 'color:cornflowerblue', rotMatrix[0], pntArr[0], pntArr[0] * rotMatrix[0])
      // console.log('%c-sin', 'color:cornflowerblue', rotMatrix[1], pntArr[1], pntArr[1] * rotMatrix[1])
      // console.log('%ccos', 'color:cornflowerblue', rotMatrix[2], pntArr[0] * rotMatrix[2])
      // console.log('%csin', 'color:cornflowerblue', rotMatrix[3], pntArr[1] * rotMatrix[3])


      console.log('%crotated point', 'color:darkgoldenrod', [...result.map(a => Math.floor(a))])
      console.log('%cinitial point', 'color:darkgoldenrod', [...pntArr.map(a => Math.floor(a))])
      console.log('%ctheta', 'color:darkgoldenrod', theta * 180 / Math.PI, center)
      result[0] += center.x
      result[1] += center.y
      return {x: result[0],y: result[1]}
   } catch (error) {
      console.error(error)
   }
}

// Get angle needed for rotation
function getAngle(pointA, pointB) {
   try {
      const slope = (pointA.y - pointB.y) / (pointA.x - pointB.x)
      console.log('getAngle, slope, angle', slope, Math.acot(slope), Math.atan(slope))
      return Math.acot(slope)
   } catch (error) {
      console.log('getSlope error', error)
   }
}

function calcMidpoint(pointA, pointB) {
   // console.log('calc midpoint', pointA, pointB)
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
      return {x:results[0],y:results[1]}
   } catch (error) {
      console.log('findCOM error:', error)
      return {x:0,y:0}
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