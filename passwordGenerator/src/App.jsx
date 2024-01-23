import { useState, useCallback, useEffect, useRef} from 'react'


function App() {

  // Variable required are declared here
  const [length , setLength] = useState(8)
  const [numberAllow , setNumberAllow] = useState(false)
  const [character , setCharacter] = useState(false)
  const [password , setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  // Method to generate password
  const passwordGenerator = useCallback(() =>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str += "0123456789"
    if(character) str += "!@#$%&*"

    for(let i=0; i<= length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllow,character,setPassword]) //used to optimize 


  // Copy the password to clipboard (Optimize using passwordRef)
  const copyPasswordtoClipboard = useCallback(() =>{
    passwordRef.current?.select();

    // Select particular range 
    //passwordRef.current?.setSelectionRange(0,10);

    window.navigator.clipboard.writeText(password)
  },
  [password]
  )

  // used to run (when page is loaded)
  useEffect(() =>{
    passwordGenerator()
  }, [length, numberAllow, character, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg mx-auto
      shadow-md rounded-lg px-5 py-5 my-8  text-orange-500 bg-gray-800'>
        <h1 className=' text-white  text-2xl text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}

          ></input>
          <button
          onClick={copyPasswordtoClipboard}
          className='outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0'
          >Copy</button>

        </div>
        <div className='flex text-base gap-x-4'>
          <div className='flex item-center gap-x-2 text-white'>
          <input
           type="range" 
           min={6}
           max={50}
           value={length}
           className='cursor-pointer '
           
           onChange={(e) => {setLength(e.target.value)}}
           
            />
            <label >Length:{length}</label>
            
        </div>
        <div className='flex item-center gap-x-2 text-white'>
          <input
            type='checkbox'
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={() =>{
              setNumberAllow((prev) => !prev);
            }}

          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex item-center gap-x-2 text-white'>
          <input
            type='checkbox'
            defaultChecked={character}
            id="characterInput"
            onChange={() =>{
              setCharacter((prev) => !prev);
            }}

          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
