class TableCore {

}

class TableCon extends TableCore {
    static make(shape,x,y) {
        if (shape === 'circle') return new RoundTable(shape,x)
        if (shape === 'rectangle') return new LongTable(shape,x,y)
        if (shape === 'square') return new SquareTable(shape,x)
    }
}

class RoundTable extends TableCore {
    constructor(shape, diameter) {
        super()
        this.shape = shape ?? 'circle'
        this.diameter = diameter ?? 60 
        this.diameter = Number(this.diameter)
    }
}

class LongTable extends TableCore {
    constructor(shape, length, width) {
        super()
        this.shape = shape ?? 'rectangle'
        this.length = length ?? 80
        this.width = width ?? 20
        this.length = Number(this.length)
        this.width = Number(this.width)
    }
}

class SquareTable extends TableCore {
    constructor(shape, side) {
        super()
        this.shape = shape ?? 'square'
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