import { Line } from "../models"

function handleCollision(tableCoord,number) {
   try {
      const tables = document.getElementsByClassName('table-obj')
      const vertices = document.getElementsByClassName('boundary-vertex')
      const divRect = document.getElementById('boundary')?.getBoundingClientRect()
      const centerOfMass = findCOM(vertices, divRect)
      resetCanvas()
      const lines = genBoundaryLine(vertices, centerOfMass, divRect)
      const rotatedPoints = []
      const sqrPoints = []
      const linPoints = []
      const checkBools = []

      const table = tables.item(number).getBoundingClientRect()
      for (let i = 0; i < vertices.length; i++) {
         if (vertices.length === 2 && i === 1) break
         const vertex = vertices.item(i).getBoundingClientRect()
         const vAngle = getVertexAngle(vertex, centerOfMass, divRect)
         const rotVertex = rotateByAngle({ x: vertex.x - divRect.x, y: vertex.y - divRect.y }, -1 * vAngle, centerOfMass)
         const check = checkTable(rotVertex, vAngle, table, lines[i], centerOfMass, divRect, tableCoord, i)
         rotatedPoints.push(rotVertex)
         sqrPoints.push(...check[1].sqr)
         linPoints.push(...check[1].lin)
         checkBools.push(check[0])
      }
      return [[rotatedPoints, sqrPoints, linPoints], checkBools]
   } catch (error) {
      console.log('handleCollision error', error)
   }
}


// get angle between vertex and origin
function getVertexAngle(point, center, offset = { x: 0, y: 0 }) {
   try {
      const adjPoint = { x: point.x - offset.x, y: point.y - offset.y }
      const ray = new Line(adjPoint, center)
      return ray.angle
   } catch (error) {
      console.log('getVertexAngle error', error)
   }
}

// check if table is in interior of room
function checkTable(rotVertex, angle, tableDiv, line, origin, offset, tableCoords, lineIndex) {
   try {
      const pointsArraySqr = []
      const pointsArrayLine = []
      const offsetTable = {
         a: { 
            x: tableCoords.x,
            y: tableCoords.y },
         b: { 
            x: tableCoords.x + tableDiv.width, 
            y: tableCoords.y },
         c: {
            x: tableCoords.x + tableDiv.width, 
            y: tableCoords.y + tableDiv.height },
         d: { 
            x: tableCoords.x, 
            y: tableCoords.y + tableDiv.height }
      }
      // check that table is within main boundaries
      const rotTable = {}
      for (const key in offsetTable) {
         if (checkOutsideWindow(offsetTable)) {
            throw new Error('Table is too far outside of setup window')
         }
         rotTable[key] = rotateByAngle(offsetTable[key], -1 * angle, origin)
         const line2Vertex = new Line(rotTable[key], rotVertex)
         const lineColor = ['red','green','orange','cyan','indigo', 'lightgreen', 'maroon', 'pink', 'yellow']
         line2Vertex.renderToBoundary(lineColor[lineIndex])
         rotTable[key].slope = line2Vertex.slope
         rotTable[key].angle = line2Vertex.angle
         pointsArraySqr.push({ 
            x: rotTable[key].x, 
            y: rotTable[key].y })
      }
      const rotLinePoints = [rotateByAngle(line?.pointA, -1* angle, origin),
          rotateByAngle(line.pointB, -1* angle, origin)]
      const rotLine = new Line(rotLinePoints[0], rotLinePoints[1])
      rotLine.renderToBoundary('purple')
      pointsArrayLine.push(...rotLinePoints)

      // Check direction of vertices
      if (rotLine.angle < 0) { // vertices are arranged clockwise
         for (const key  in rotTable){
            if(rotTable[key].angle < rotLine.angle
               || rotTable[key].angle > rotLine.angle + Math.PI){
                  return [false, {sqr: pointsArraySqr, lin: pointsArrayLine}]
               }
         }
      } else { // vertices are arranged counter-clockwise
         for (const key  in rotTable){
            if (rotTable[key].angle > rotLine.angle 
               && rotTable[key].angle < rotLine.angle + Math.PI) {
               return [false, {sqr: pointsArraySqr, lin: pointsArrayLine}]}
         }
      }
      return [true, { sqr: pointsArraySqr, lin: pointsArrayLine }]
   } catch (error) {
      console.log('checkTable error:', error)
      return [false, { sqr: [], lin: [] }]
   }
}

function checkOutsideWindow(pointsObj) {
   const divRect = document.getElementById('boundary')?.getBoundingClientRect()
   const [height, width] = [divRect.height, divRect.width]
   for (const key in pointsObj) {
      if (pointsObj[key].x < 0 ||
         pointsObj[key].y < 0 ||
         pointsObj[key].x > width ||
         pointsObj[key].y > height
      ) {
         return true
      }
   }
   return false
}

// Take vertices, and build array of line Objects
function genBoundaryLine(vertices, center, offset) {
   try {
      const length = vertices.length
      if (length <= 1) {
         throw new Error('Not enough vertices to draw lines between. Need 2 or more.')
      }
      const vertexArr = [...vertices].map((vertex) => vertex.getBoundingClientRect())
      const resultLines = new Array(length > 2 ? length : 1)
      for (let i = 0; i < length; i++) {
         vertexArr[i].x -= offset.x
         vertexArr[i].y -= offset.y
      }
      for (let i = 0; i < length; i++) {
         if (i === length - 1) {//if on last element, connect first and last point
            if (length === 2) {
               return resultLines
            } //can only make one line, so already done
            const midpoint = calcMidpoint(vertexArr[i], vertexArr[0])
            const direction = { x: center[0] - midpoint.x, y: center[1] - midpoint.y }
            resultLines[i] = new Line(vertexArr[i], vertexArr[0])
            resultLines[i].renderToBoundary('blue')
         } else {
            const midpoint = calcMidpoint(vertexArr[i], vertexArr[i + 1])
            const direction = { x: center[0] - midpoint.x, y: center[1] - midpoint.y }
            resultLines[i] = new Line(vertexArr[i], vertexArr[i + 1])
            resultLines[i].renderToBoundary('blue')
         }
      }
      return resultLines
   } catch (error) {
      console.log('genBoundaryLine error', error)
      return error
   }
}


// takes a point object {x,y} and angle theta in radians
function rotateByAngle(point, theta, center) {
   try {
      const pntArr = [point.x - center.x, point.y - center.y]
      const rotMatrix = [Math.cos(theta), Math.sin(theta) * -1, Math.sin(theta), Math.cos(theta)] // cos theta   -sin theta/ sin theta cos theta
      const result = [pntArr[0] * rotMatrix[0] + pntArr[1] * rotMatrix[1], pntArr[0] * rotMatrix[2] + pntArr[1] * rotMatrix[3]]

      result[0] += center.x
      result[1] += center.y
      return { x: Math.floor(result[0]), y: Math.floor(result[1]) }
   } catch (error) {
      console.error(error)
   }
}

function calcMidpoint(pointA, pointB) {
   return { x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2 }
}

function resetCanvas(){
   const canvas = document.getElementById('canvas').getContext('2d')
   canvas.reset()
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

      results[0] /= length
      results[1] /= length

      return { x: results[0], y: results[1] }
   } catch (error) {
      console.log('findCOM error:', error)
      return { x: 0, y: 0 }
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
      return center
   } catch (error) {
      console.log('findCOMCoord error', error)
      return { x: 0, y: 0 }
   }
}

export { handleCollision, findCOM, findCOMCoord }