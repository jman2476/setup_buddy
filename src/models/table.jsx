export default class Table {
    shape = 'circle'; //circle or rectangle
    length = 6;
    width = this.shape==='circle'? null:4;
    
    constructor(shape, length, width) {
        try {
            if (shape === 'circle') {
                this.shape = shape
                this.length = length
            } else if (shape === 'rectangle') {
                this.shape = shape
                this.length = length
                this.width = width
            } else {
                throw new Error('Table must be circle or rectangle')
            }
        } catch (err) {
            console.log(err)
            return err
        }
    }

}

