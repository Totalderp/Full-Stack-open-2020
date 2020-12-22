import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Komponentti napeille ja niiden toimintojen kutsulle
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

//Header palkin komponentti
const Header = () => {
  return <h1>{"Anecdote of the day"}</h1>
}

//Footer palkin komponentti
const Footer = (props) => {

  //lasketaan for-loopin avulla, että millä anekdootilla on eniten ääniä
  //enitenaania = äänien lukumäärä
  //sijainti = eniten ääniä saaneen adekdootin sijainti arrayssa
  let sijainti = 0;
  let enitenaania = 0;
  for(let i = 0; i < props.lista.length; i++) {
      if(enitenaania < props.paras[i]) {
        enitenaania = props.paras[i];
        sijainti = i;
      }
  }

  //rakennetaan palautettavat tiedot
  return (
  <div>
    <h1>
      {"Anecdote with most votes"}
    </h1>
    <p>
      {props.lista[sijainti]}
    </p>
    <p>
      {"has " + enitenaania + " votes"}
    </p>
  </div>
  )
}

//Palauttaa nykyisen anekdootin äänet
const NaytaVotes = (props) => {
  return (
    <p>
      {"has " + props.current[props.currentselected] + " votes"}
    </p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  //tehdään oikea oppinen kopio nykyisistä äänistä, kasvatetaan arvoa yhdelä ja asetetaan tulos vanhan tilalle
  const vote = () => {
    const korvaaMinulla = [...votes]
    korvaaMinulla[selected] += 1
    setVotes(korvaaMinulla)
  }

  return (
    <div>
      <Header />
      <p>
      {props.anecdotes[selected]}
      </p>
      <NaytaVotes current = {votes} currentselected = {selected}/>
      <Button handleClick={() => vote()} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))} text="next anecdote" />
      <Footer paras = {votes} lista = {anecdotes}/>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)