class Table {
    // shape;
    
    // constructor(shape, length, width) {
    //     try {
    //         if (shape === 'circle') {
    //             this.shape = shape
    //             this.length = length
    //         } else if (shape === 'rectangle') {
    //             this.shape = shape
    //             this.length = length
    //             this.width = width
    //         } else {
    //             throw new Error('Table must be circle or rectangle')
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         return err
    //     }
    // }

}

class RoundTable extends Table {
    constructor(shape, diameter) {
        super()
        this.shape = shape
        this.diameter = diameter
    }
}

class LongTable extends Table {
    constructor(shape, length, width) {
        super()
        this.shape = shape
        this.length = length
        this.width = width
    }
}

class SquareTable extends Table {
    constructor(shape, side) {
        this.shape = shape
        this.side = side
    }
}

export {
    RoundTable,
    LongTable,
    SquareTable
}