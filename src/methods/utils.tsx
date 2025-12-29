function cleanNumInput(inputVal: string): number {
   //Take <string> input and check if it is a number
   //use Regex to check for characters '0123456789.-'
   //  -if contains, continue
   //  -else, return -1 (false)
   // -check for other characters
   //  -if contains, return -1
   //  -else, continue
   try {const regex: RegExp = /(^[-]?)[0123456789]{0,}([.])?[0123456789]{1,}/g
   regex.test(inputVal)
   const number: number = parseFloat(inputVal.slice(0,regex.lastIndex))
   
   if (regex.lastIndex < inputVal.length) throw Error('What are you doing?')
   return number
   } catch (error) {
      console.log(`%cError: Non-number input. ${error}`, 'color: red')
      return 1
   }

}

export {
   cleanNumInput
}