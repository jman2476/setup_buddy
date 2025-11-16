function handleCollision(rectangle,) {
   try {
      const tables = document.getElementsByClassName('table-obj')
      const vertices  = document.getElementsByClassName('boundary-vertex')
      console.log(vertices)
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

export { handleCollision }