import { useRef, useState } from "react"

function Boundary ({ children }) {
    const [pointList, setPointList] = useState([])
    const editBoundRef = useRef(false)
    const pointCounter = useRef(0)

    const handleEditButton = () => {
        editBoundRef.current= !editBoundRef.current
        console.log(editBoundRef.current)
    }

    // if editBoundRef===true, click field to create points
    const handleSetBound = (event) => {
        try {
            console.log('handle set boundary')
            if (editBoundRef.current){
                console.log('select point for boundary')
                const mousePosition = {
                    x: event.clientX,
                    y: event.clientY
                }
                console.log(mousePosition, 'click')
                pointCounter.current++
                setPointList(arr => [...arr, mousePosition])
            } else {
                throw new Error('Boundary edit is toggled off')
            }
        } catch(err) {
            console.log(err)
        }
    }
    console.log('Point List', pointList)

    // Can create points, but the offset is wrong
    // needs to be adjusted to account for the 
    // Boundary component position
    function BoundaryPoint ({ positionObj }){
        console.log(positionObj,'point position')
        return (
            <>
                <div 
                    style={{
                        position:'absolute',
                        top: `${positionObj.y}px`,
                        left: `${positionObj.x}px`
                    }}>
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
                    right: '-50px'
                }}
                onClick={handleEditButton}
                >Edit boundaries</button>
            <div
                onClick={e=>handleSetBound(e)}
                className="boundary"
            > Potato
                {pointList.map((obj,index)=>{
                    console.log(obj,'point obj')
                    return (
                        <BoundaryPoint 
                            positionObj={obj} 
                            key={index+'point'}/>
                    )
                })}
                {children}
            </div>
        </>
    )
}

export default Boundary