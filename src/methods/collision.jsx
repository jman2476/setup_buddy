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

function findCOM (vertices,divOffset) {
   try {
      const vertexArr = [...vertices]
      const length = vertices.length -1 
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

export { handleCollision, findCOM }