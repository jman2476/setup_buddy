class Line {
   constructor(pointA, pointB) {
      this.pointA = { x: pointA.x, y: pointA.y }
      this.pointB = { x: pointB.x, y: pointB.y }
      this.slope = (this.pointA.y - this.pointB.y) / (this.pointA.x - this.pointB.x)
      this.midpoint = { x: (this.pointA.x + this.pointB.x) / 2, y: (this.pointA.y + this.pointB.y) / 2 }
      this.angle = this.setAngle()
      this.length = this.getLength()

      console.log('Line length', this.length)
   }

   getLength() {
      return Math.sqrt((this.pointA.x-this.pointB.x)^2+(this.pointA.y-this.pointB.y)^2)
   }

   setAngle() {
      return Math.atan(this.slope)
   }
}

export default Line