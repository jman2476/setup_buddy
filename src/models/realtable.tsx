import type { JSXElementConstructor, ReactElement } from 'react'
import {
   RoundTable,
   LongTable,
   SquareTable
} from './table'

interface RealTable {
   shape: string
   name: string
   length?: number
   width?: number
   diameter?: number
   units: 'ft' | 'm'
   scaleFactor: number
   alias: RoundTable | LongTable | SquareTable
   component?: React.ReactElement
}

class RealTableCon {
   static make(shape: string): RealTable {
      let newTable: RealTable
      switch(shape) {
         case 'circle': {
            newTable = new RealTableRound
            break
         };
         case 'square': {
            newTable = new RealTableSquare
            break
         };
         case 'rectangle': {
            newTable = new RealTableLong
            break
         };
         default: newTable = new RealTableRound
      }

      return newTable
   }
}

class RealTableRound implements RealTable{
   [key: string]: string | number | RoundTable | React.ReactElement
   shape: string
   name: string
   diameter: number 
   units: "ft" | "m"
   scaleFactor: number
   alias: RoundTable
   component: React.ReactElement
   
   constructor() {
      this.shape = 'circle'
      this.name = ''
      this.diameter = 6
      this.units = 'ft'
      this.scaleFactor = 10
      this.alias = new RoundTable(this.shape,0,
         this.diameter*this.scaleFactor)
      this.component = <></>
   }

}

class RealTableLong implements RealTable{
   [key: string]: string | number | LongTable | ReactElement
   shape: string
   name: string
   length: number
   width: number
   units: 'ft' | 'm'
   scaleFactor: number
   alias: LongTable
   component: React.ReactElement


   constructor() {
      this.shape = 'rectangle'
      this.name = ''
      this.length = 8
      this.width = 3
      this.units = 'ft'
      this.scaleFactor = 10
      this.alias = new LongTable(this.shape,0,
         this.length*this.scaleFactor,
         this.width*this.scaleFactor)
      this.component = <></>
   }
}

class RealTableSquare implements RealTable{
   [key: string]: string | number | SquareTable | ReactElement
   shape: string
   name: string
   width: number
   units: 'ft' | 'm'
   scaleFactor: number
   alias: SquareTable
   component: React.ReactElement

   constructor() {
      this.shape = 'square'
      this.name = ''
      this.width = 3
      this.units = 'ft'
      this.scaleFactor = 10
      this.alias = new SquareTable(this.shape,0,
         this.width*this.scaleFactor)
      this.component = <></>

   }
}

export {
   RealTableLong,
   RealTableRound,
   RealTableSquare,
   RealTableCon
}

export type {
   RealTable
}