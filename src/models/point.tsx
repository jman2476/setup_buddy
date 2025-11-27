class Point {
   x: number
   y: number

   constructor(x: number, y: number) {
      this.x = x
      this.y = y
   }
}

class CollisionPoint extends Point {
   slope: number = 0
   angle: number = 0
   constructor(x: number, y: number) {
      super(x,y)
   }
}

export {
   Point,
   CollisionPoint
}