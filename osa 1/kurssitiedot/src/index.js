import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content eka={part1} toka={part2} kolmas={part3} luku1={exercises1} luku2={exercises2} luku3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part name={props.eka} number={props.luku1}/>
      <Part name={props.toka} number={props.luku2}/>
      <Part name={props.kolmas} number={props.luku3}/>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.name + " " + props.number}
      </p>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        {"Number of exercises " + props.total}
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))