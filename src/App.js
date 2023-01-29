import { useState, useEffect } from "react"
import pauseMobile from "./images/pattern-divider-mobile.svg"
import pauseDesktop from "./images/pattern-divider-desktop.svg"
import dice from "./images/icon-dice.svg"

function App() {
  const [text, setText] = useState([])
  const [pending , setPending] = useState(false)



 

  const fetchJoke = async () => {
    setPending(true)
    try{
      const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single")
      const data = await res.json()
  
      console.log(data)
      if(data){
        setPending(false)
      }
  
      setText(data)
    }catch(err){
      console.log(err)
    }

   
  }

  useEffect(() => {
    fetchJoke() 
  }, [])

  return (
    <div className="container">
      <h1>Joke #{text.id}</h1>
      <h3>Category :{text.category}</h3>
      {!pending && <p>{text.joke}</p> }
      {pending && <img src="/assets/rolling.svg" />}

      <picture>
        <source media="(min-width: 768px)" srcSet={pauseDesktop} />
        <img src={pauseMobile} alt="" />
      </picture>

      <div>
        {!pending && <button onClick={fetchJoke}>
          <img src={dice} alt="" />
        </button> }
        {pending && <button >
          <img src={dice} alt="" />
        </button> }
      </div>
    </div>
  )
}

export default App
