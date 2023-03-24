import { useState, useRef } from 'react'

function App() {
  
  const [text, setText] = useState("")
  const [printText,setPrintText] = useState([])

  const textArea = useRef("");
  const button = useRef("");
  const _200 = useRef("");
  const _500 = useRef("");
  const _1000 = useRef("");



  const populate =(e)=>{
    setText(e.target.value)
  }

  const clickHandler =()=>{
    setPrintText([])
    textArea.current.disabled = true;
    button.current.disabled = true;
    let wordsArr = text.split(" ")
    printWord(wordsArr)
  }

  function printWord(wordsArr){
    let selectedInterval
    if (_200.current.checked ==true){
      selectedInterval = 200
    }
    if (_500.current.checked ==true){
      selectedInterval = 500
    }
    if (_1000.current.checked ==true){
      selectedInterval = 1000
    }
    let counter = -1 
    let myInterval = setInterval(()=>{
        setPrintText(prevPrintText =>
          [...prevPrintText, wordsArr[counter]] 
        )
        counter ++
        if (counter === wordsArr.length) {
          clearInterval(myInterval)
          textArea.current.disabled = false
          button.current.disabled = false
        }
    },selectedInterval)    
  }

  let spacedArray = printText.map(e => <span>{e} </span>)

  return (
    <div className="w-screen">
      <div className="flex flex-col w-2/3 m-auto justify-center items-center">
        <h2>I'm the gradual giver</h2>
        <p>Write some text below, select how gradually you want me to give the text back to you, and then watch the magic happen.</p>
        <textarea className='border-cyan-700 border-2' ref={textArea} onChange ={populate}/>
        
        <div>
          <input type="radio" id="200" name="delay" value="200" ref={_200} defaultChecked/>
          <label for="200">200ms</label>
          <input type="radio" id="500" name="delay" value="500" ref={_500}/>
          <label for="500">500ms</label>
          <input type="radio" id="1000" name="delay" value="1000" ref={_1000}/>
          <label for="1000">1000ms</label>
        </div>
        <button className='border-cyan-700 border-2' onClick={clickHandler} ref={button}>Give it back gradually</button>
        
        <div className='answer-box'>
          {spacedArray}
        </div>
      </div>
    </div>

  )
}

export default App
