import { useRef, useState } from "react"

function Boundary ({ children }) {
    const [pointList, setPointList] = useState()
    const editBoundRef = useRef(false)

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
            } else {
                throw new Error('Boundary edit is toggled off')
            }
        } catch(err) {
            console.log(err)
        }
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
                {children}
            </div>
        </>
    )
}

export default Boundary