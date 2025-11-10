class TableCore {

}

class TableCon extends TableCore {
    static make(shape) {
        if (shape === 'circle') return new RoundTable()
        if (shape === 'rectangle') return new LongTable()
        if (shape === 'square') return new SquareTable()
    }
}

class RoundTable extends TableCore {
    constructor(shape, diameter) {
        super()
        this.shape = shape ?? 'circle'
        this.diameter = diameter ?? 60 
    }
}

class LongTable extends TableCore {
    constructor(shape, length, width) {
        super()
        this.shape = shape ?? 'rectangle'
        this.length = length ?? 80
        this.width = width ?? 20
    }
}

class SquareTable extends TableCore {
    constructor(shape, side) {
        super()
        this.shape = shape ?? 'square'
        this.side = side ?? 40
    }
}

export {
    TableCon,
    RoundTable,
    LongTable,
    SquareTable
}