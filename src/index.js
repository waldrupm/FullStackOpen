import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = (props) => {
  const [ counter, setCounter ] = useState(0);
  const setToValue = (value) => setCounter(value);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={() => setToValue(counter+1)} text={'Plus'} />
      <Button onClick={() => setToValue(counter-1)} text={'Minus'} />
      <Button onClick={() => setToValue(0)} text={'Reset'} />
    </div>

  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)