class TableCore {

}

class TableCon extends TableCore {
    static make(shape,angle,x,y) {
        if (shape === 'circle') return new RoundTable(shape,angle,x)
        if (shape === 'rectangle') return new LongTable(shape,angle,x,y)
        if (shape === 'square') return new SquareTable(shape,angle,x)
    }
}

class RoundTable extends TableCore {
    constructor(shape, angle, diameter) {
        super()
        this.shape = shape ?? 'circle'
        this.angle = angle | 0
        this.diameter = diameter ?? 60 
        this.diameter = Number(this.diameter)
    }
}

class LongTable extends TableCore {
    constructor(shape, angle, length, width) {
        super()
        this.shape = shape ?? 'rectangle'
        this.angle = angle | 0
        this.length = length ?? 80
        this.width = width ?? 20
        this.length = Number(this.length)
        this.width = Number(this.width)
    }
}

class SquareTable extends TableCore {
    constructor(shape, angle, side) {
        super()
        this.shape = shape ?? 'square'
        this.angle = angle | 0
        this.side = side ?? 40
        this.side = Number(this.side)
    }
}

export {
    TableCon,
    RoundTable,
    LongTable,
    SquareTable
}