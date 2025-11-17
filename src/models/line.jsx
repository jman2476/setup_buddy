class Line {
   constructor(pointA, pointB, direction) {
      this.pointA = {x: pointA.x, y: pointA.y}
      this.pointB = {x: pointB.x, y: pointB.y}
      this.slope = (this.pointA.y - this.pointB.y)/(this.pointA.x - this.pointB.x)
      this.direction = {x: direction.x, y: direction.y} ?? {x:null,y:null}
   }

   intercept(x,y) {
      
   }
}

export default Line