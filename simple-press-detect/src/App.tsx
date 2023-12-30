import React, {useState, useEffect} from 'react'

const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) setKeyPressed(true)
  }

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) setKeyPressed(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  })

  return keyPressed
}

export default function App() {
  const pressed = useKeyPress('a')

  return (
    <div>
      {pressed ? (
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/ONbulb.jpg" alt='bulb-on'/>
      ) : (
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/OFFbulb.jpg" alt='bulb-off'/>
      )}
    </div>
  )
}
