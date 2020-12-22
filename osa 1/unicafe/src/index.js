import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Header = () => {
  return <h1>{"give feedback"}</h1>
}

const Results = () => {
  return <h1>{"statistics"}</h1>
}

const StatisticLine = (props) => {
  return (
      <tbody>
        <tr>
          <td>
            {props.text}
          </td>
          <td>
            {props.value}
          </td>
        </tr>
      </tbody>
  )
}

const Statistics = (props) => {
  console.log(props)///////////////////////////////////////
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <p>
        {"No feedback given"}
      </p>
    )
  }
  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.neutral + props.bad + props.good} />
      <StatisticLine text="average" value={(props.good - props.bad)/(props.neutral + props.bad + props.good)} />
      <StatisticLine text="positive" value={(props.good)/(props.neutral + props.bad + props.good) * 100 + " %"} />
    </table>


  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Results />
      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)