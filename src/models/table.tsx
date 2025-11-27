interface Table {
   [key: string]: string | number | undefined
   shape: string
   angle: number
   side?: number | undefined
   diameter?: number | undefined
   length?: number | undefined
   width?: number | undefined
}

class TableCore {

}


class TableCon extends TableCore {
   // write proper function overload so this can take 
   static make(shape: string): RoundTable | LongTable | SquareTable
   static make(shape: string, angle?: number, x?: number, y?: number): Table {
      if (shape === 'circle') return new RoundTable(shape, angle, x)
      if (shape === 'rectangle') return new LongTable(shape, angle, x, y)
      if (shape === 'square') return new SquareTable(shape, angle, x)

      //Default, wrong shape
      return new RoundTable('circle', 0, 60)
   }

   static remake(valuesArray: string[]) {
      const shape: string = valuesArray[0]
      const angle: number = Number(valuesArray[1])
      const x: number = Number(valuesArray[2])
      const y: number = Number(valuesArray[3] ? valuesArray[3] : NaN)
      if (valuesArray[0] === 'circle') return new RoundTable(shape, angle, x)
      if (shape === 'rectangle') return new LongTable(shape, angle, x, y)
      if (shape === 'square') return new SquareTable(shape, angle, x)
   }
}

class RoundTable extends TableCore implements Table {
   [key: string]: string | number
   shape: string
   angle: number
   diameter: number

   constructor(shape: string, angle: number | undefined, diameter: number | undefined) {
      super()
      this.shape = shape ?? 'circle'
      this.angle = angle ?? 0
      this.diameter = diameter ?? 60
   }
}

class LongTable extends TableCore implements Table {
   [key: string]: string | number
   shape: string
   angle: number
   length: number
   width: number

   constructor(shape: string, angle: number | undefined, length: number | undefined, width: number | undefined) {
      super()
      this.shape = shape ?? 'rectangle'
      this.angle = angle ?? 0
      this.length = length ?? 80
      this.width = width ?? 20
   }
}

class SquareTable extends TableCore implements Table {
   [key: string]: string | number
   shape: string
   angle: number
   side: number

   constructor(shape: string, angle: number | undefined, side: number | undefined) {
      super()
      this.shape = shape ?? 'square'
      this.angle = angle ?? 0
      this.side = side ?? 40
   }
}

export {
   TableCon,
   RoundTable,
   LongTable,
   SquareTable
}