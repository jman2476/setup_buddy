class Line {
   constructor(pointA, pointB, direction) {
      this.pointA = {x: pointA.x, y: pointA.y}
      this.pointB = {x: pointB.x, y: pointB.y}
      this.slope = (this.pointA.y - this.pointB.y)/(this.pointA.x - this.pointB.x)
      this.direction = {x: direction.x, y: direction.y} ?? {x:null,y:null}
      this.midpoint = {x: (this.pointA.x+this.pointB.x)/2, y:(this.pointA.y+this.pointB.y)/2}
      this.angle = this.setAngle()
   }

   setAngle() {
      if (this.slope > 0){
         return Math.atan(this.slope)
      } else {
         return Math.atan(1/this.slope)
      }
   }
}

export default Line