class Line {
   constructor(pointA, pointB) {
      this.pointA = { x: pointA.x, y: pointA.y }
      this.pointB = { x: pointB.x, y: pointB.y }
      this.slope = (this.pointA.y - this.pointB.y) / (this.pointA.x - this.pointB.x)
      this.midpoint = { x: (this.pointA.x + this.pointB.x) / 2, y: (this.pointA.y + this.pointB.y) / 2 }
      this.angle = this.setAngle()
      this.length = this.getLength()
   }

   getLength() {
      return Math.sqrt((this.pointA.x-this.pointB.x)^2+(this.pointA.y-this.pointB.y)^2)
   }

   setAngle() {
      return Math.atan(this.slope)
   }

   renderToBoundary(color='green') {
      const canvas = document.getElementById('canvas')
      const lineWriter = canvas.getContext('2d')

      lineWriter.beginPath()
      lineWriter.strokeStyle = `${color}` 
      lineWriter.moveTo(this.pointA.x,this.pointA.y)
      lineWriter.lineTo(this.pointB.x,this.pointB.y)
      lineWriter.stroke()
      console.log(`%cLine drawn from ${this.pointA.x},${this.pointA.y}to ${this.pointB.x},${this.pointB.y}`, `color: ${color}`)
   }
}

export default Line