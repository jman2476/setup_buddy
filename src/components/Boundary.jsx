import { useRef, useState } from "react"

function Boundary({ children }) {
    const [pointList, setPointList] = useState([{ x: 0, y: 0 }])
    const editBoundRef = useRef(false)
    const pointCounter = useRef(1)

    const handleEditButton = () => {
        editBoundRef.current = !editBoundRef.current
        console.log(editBoundRef.current)
    }

    const handleResetButton = () => {
        setPointList([{ x: 0, y: 0 }])
        pointCounter.current = 1
    }

    // if editBoundRef===true, click field to create points
    const handleSetBound = (event) => {
        try {
            console.log('handle set boundary')
            if (editBoundRef.current) {
                console.log('select point for boundary')
                const mousePosition = {
                    x: event.clientX - 158,
                    y: event.clientY - 109
                }
                console.log(mousePosition, 'click')
                pointCounter.current++
                setPointList(arr => [...arr, mousePosition])
                // test to locate 0,0
            } else {
                throw new Error('Boundary edit is toggled off')
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log('Point List', pointList)

    // Can create points, but the offset is wrong
    // needs to be adjusted to account for the 
    // Boundary component position
    function BoundaryPoint({ positionObj }) {
        console.log(positionObj, 'point position')
        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: `${positionObj.y}px`,
                        left: `${positionObj.x}px`
                    }}
                    className="boundary-vertex">
                    {'\u2022'}
                </div>
            </>
        )
    }

    return (
        <>
            <button
                style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-130px',
                    width: '160px',
                    height: '40px',
                    fontSize: '12pt'

                }}
                onClick={handleEditButton}
                className={''}
            >Edit boundaries</button>
            <button
                style={{
                    position: 'absolute',
                    top: '40px',
                    right: '-130px',
                    width: '170px',
                    height: '40px',
                    fontSize: '12pt'
                }}
                onClick={handleResetButton}
            >Reset boundaries</button>
            <div
                onClick={e => handleSetBound(e)}
                className="boundary"
            > {editBoundRef? 'Editable' : ''}
                {pointList.map((obj, index) => {
                    console.log(obj, 'point obj')
                    return (
                        <BoundaryPoint
                            positionObj={obj}
                            key={index + 'point'} />
                    )
                })}
                {children}
            </div>
        </>
    )
}

export default Boundary