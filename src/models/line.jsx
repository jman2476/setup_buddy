class Line {
   constructor(pointA, pointB, slope, direction) {
      this.pointA = {x: pointA.x, y: pointA.y}
      this.pointB = {x: pointB.x, y: pointB.y}
      this.slope = slope
      this.direction = {x: direction.x, y: direction.y}
   }
}

export default Line