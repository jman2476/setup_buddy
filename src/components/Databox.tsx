import { useRef } from 'react'

interface DataBoxProps {
   field: string
   value: string|number
}

function DataBox({ field, value }: DataBoxProps) {
   // // opt-out of auto-memoization
   // 'use no memo'
   // handle the state in this 
   const dimension = useRef<string|number>(value)

   const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
         console.log('Press the update button')
      }
   }
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dimension.current = e.target.value 
   }

   if (field === 'shape') {

      return (
         <>
            Current {`${field} = ${value}`}
            <select name="shape" defaultValue={`${value}`}>
               <option value="circle">Round</option>
               <option value="rectangle">Long</option>
               <option value="square">Square</option>
            </select>
         </>
      )
   } else {
      return (
         <>
            {`${field}`}
            <input
               className='input'
               type="number"
               name={`${field}`}
               id={`${field}`}
               onKeyDown={e => handleKeyDown(e)}
               onChange={(e => handleChange(e))}
               defaultValue={value}
            />
         </>
      )

   }

}

export default DataBox