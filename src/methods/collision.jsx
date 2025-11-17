function handleCollision(rectangle,) {
   try {
      const tables = document.getElementsByClassName('table-obj')
      const vertices  = document.getElementsByClassName('boundary-vertex')
      const divRect = document.getElementById('boundary')?.getBoundingClientRect()
      console.log(vertices)
      const centerOfMass = findCOM(vertices,divRect)
      console.log(centerOfMass,"COM")
      if (tables.length > 0) {
         for (let i = 0; i < tables.length; i++) {
            const element = tables.item(i)
            const table = element.getBoundingClientRect()

         }
      }
   } catch (error) {
      console.log(error)
   }

}

// Take vertices, and build array of line Objects

// For finding the Center of Mass based on already rendered components
function findCOM (vertices,divOffset) {
   try {
      const vertexArr = [...vertices]
      const length = vertices.length
      let results = [0,0] // [x,y]
      const offset = [divOffset.x,divOffset.y]
      for (let item in vertexArr){
         if(item === 0) continue
         console.log(vertexArr[item].getBoundingClientRect(), item, 'vertex')
         const rect = vertexArr[item].getBoundingClientRect() 
         results[0] += rect.x
         results[1] += rect.y
         results[0] -= offset[0]
         results[1] -= offset[1]
      }
      console.log(results)
      results[0] /= length
      results[1] /= length
      console.log(results, length)
      return results
   } catch (error) {
      console.log('findCOM error:', error)
      return [0,0]
   }
}

// For finding the Center of Mass based on vertex coordinates
function findCOMCoord (coordArray) {
   try {
      const center = coordArray.reduce((acc, curr)=>{
         acc.x += curr.x
         acc.y += curr.y
         
         return acc
      },{x:0,y:0})
      console.log('findComCoord center', center, coordArray.length)
      center.x /= coordArray.length
      center.y /= coordArray.length
      console.log(center, 'findCOMCoord')
      return center
   } catch (error) {
      console.log('findCOMCoord error', error)
      return {x:0,y:0}
   }
}

export { handleCollision, findCOM, findCOMCoord }