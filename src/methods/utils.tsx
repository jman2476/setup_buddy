import type { RealTable, Point, Line } from '../models'

function cleanNumInput(inputVal: string): number {
   //Take <string> input and check if first part is number
   //use Regex to check for characters '0123456789.-'
   // if <string> is longer than number at start, return error
   try {
      const regex: RegExp = /(^[-]?)[0123456789]{0,}([.])?[0123456789]{1,}/g
      regex.test(inputVal)
      if (regex.lastIndex < inputVal.length) throw Error('What are you doing?')
      const number: number = parseFloat(inputVal.slice(0,regex.lastIndex))  
      return number
   } catch (error) {
      console.log(`%cError: Non-number input. ${error}`, 'color: red')
      return 1
   }
}

//parameters:
// - initial scale: number
// - final scale: number
// - Objects tuple: [RealTables[], BoundaryPoints[]]
function scaler(initScale: number, finScale: number, objects: [RealTable[], Point[]]): void {
   // Effectively will go through all position values, multiply by final/init
   // then update lists of tables, points and lines

   // Problem: Updating multiple lists at different scope levels
   //          - Real Tables and Tables lists are in App component scope
   //          - Boundary Point list is in Boundary component scope


   // I think this function is the wrong way to do it. Why am I making a function to scale everything when I can hard code the scale into the position of each object?
   // By storing initial scale on creation of an object, we can check on each rerender what the position should be

   // ANSWER:::   Because if you scale the position at table creation, you cannot dynamically scale the tables. Only gets applied once at table creation.
   const rtArr: RealTable[] = objects[0]
   const pArr: Point[] = objects[1]

   console.log(initScale, finScale, rtArr)
   for (let i = 0; i < rtArr.length; i++) {
      const realTable: RealTable = rtArr[i]
      console.log('before rescale',realTable)
      realTable.rescale(finScale)
      console.log('after rescale',realTable)

   }

   // Here's the new plan:
   // On scale change, update all RealTable objects
   //    - probably by multiplying realTable.scaleFactor * newScale
   //    - will have to update rTList with new objects
   // At rerender of tables, multiply size and position by scale
   //    - must happen exactly once
   //    - must set size while keeping relative positioning the same

}

export {
   cleanNumInput,
   scaler
}