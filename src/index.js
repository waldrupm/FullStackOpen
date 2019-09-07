import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({onClick, text}) => {

  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = ({onGood, onNeutral, onBad}) => {

  return (
    <div>
      <h1>Give Feedback</h1>
      <FeedbackButton onClick={() => onGood()} text={'Good'}/>
      <FeedbackButton onClick={() => onNeutral()} text={'Neutal'}/>
      <FeedbackButton onClick={() => onBad()} text={'Bad'}/>

    </div>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.label} {props.value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {

  
  const totalFeedback = () => {
    return good + neutral + bad;
  }

  const avg = () => {
    const goodScore = good || 0;
    const badScore = -bad || 0;
    if(!goodScore && !badScore) return 0;
    return (goodScore + badScore) / totalFeedback();
  }

  return (
    <div>
      <h1>Statistics</h1>
      <Statistic label={'Good:'} value={good} />
      <Statistic label={'Neutral:'} value={neutral} />
      <Statistic label={'Bad:'} value={bad} />
      <Statistic label={'Total Feedback:'} value={totalFeedback()} />
      <Statistic label={'Average:'} value={avg()} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1);
  }
  const addNeutral = () => {
    setNeutral(neutral + 1);
  }
  const addBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Feedback onGood={() => addGood()} onNeutral={()=> addNeutral()} onBad={()=> addBad()} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)