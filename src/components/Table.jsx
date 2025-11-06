function Table({ number,shape }) {
    const [offset, setOffSet] = useState({ x: 0, y: 0 })
    const [tableSize, setTableSize] = useState(60)
    const [focus, setFocus] = useState(false)

    const handleTableResize = (event) => {
      let newSize = tableSize
      if (newSize > 100) newSize = 100
      if (newSize < 40) newSize = 40
      setTableSize(newSize)
      console.log(tableSize)

    }


    useEffect(() => {
      const handleMouse = (event) => {
        mouseRef.current = {
          x: event.clientX,
          y: event.clientY
        }
      }
      document.addEventListener('mousemove', handleMouse)
      return () => {
        document.removeEventListener('mousemove', handleMouse)
      }
    })

    const dragEnd = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      }
      setOffSet(prev => ({
        x: prev.x + mouseRef.current.x - startRef.current.x,
        y: prev.y + mouseRef.current.y - startRef.current.y
      }))
    }
    const handleFocus = (event) => {
      setFocus(!focus)
      console.log(focus)
    }

    return (
      <>
        <div
          draggable={true}
          tabIndex={0}
          className={`table-obj ${shape}`}
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          onFocus={handleFocus}
          onBlur={handleFocus}
          style={{
            position: "absolute",
            top: `${offset.y + 100 * number}px`,
            left: `${offset.x + 100 * number}px`,
            height: `${tableSize}px`,
            width: `${tableSize}px`,
            lineHeight: `${tableSize}px`,
            fontSize: ' 200%'
          }}
        >{number}
        </div>
      </>
    )
  }

  export default Table