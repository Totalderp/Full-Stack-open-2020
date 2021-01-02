import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  //useEffect hakee sovelluksen tiedot JSON muodossa palvelimelta käyttäen axiosia
  useEffect(() => {
    console.log('effect alkaa')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('effect -> promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('Dataa löydetty:', persons.length, 'kpl')

  //Handler filtterin päivittämistä varten
  const filterMuuttuu = (event) => {
    console.log('filtterikenttä muuttuu:', event.target.value)
    setNewFilter(event.target.value)
  }

  //Handler tekstikentän päivittämistä varten
  const nimiMuuttuu = (event) => {
    console.log('tekstikenttä muuttuu:', event.target.value)
    setNewName(event.target.value)

  }

  //Handler numerokentän päivittämistä varten
  const numeroMuuttuu = (event) => {
    console.log('numerokenttä muuttuu:', event.target.value)
    setNewNumber(event.target.value)

  }

  //Ihmislistan filtteröiminen annetulla filtterillä caseINsensitiivisesti
  const filteredPersons = persons.filter(person => {
    return person.name.toLocaleLowerCase().includes(newFilter.toLowerCase())
  })

  //Handler napin toiminnalle ja nimen lisäämiselle
  const addNote = (event) => {
    event.preventDefault()
    console.log('Saatu sisältö', newName)

    //tämän simppelin rivin naputteluun meni liian kauan
    //Ottaa kaikki moniulotteisen listan name-tiedot ja tiivistää ne yhteen yksiulotteiseen listaan
    const nimet = persons.map(yksittainen => yksittainen.name)

    console.log('Nimien listassa nyt:', nimet)

    //jos nimi ei ole vielä listassa
    if (!nimet.includes(newName)) {
      const lisattavaperson = {
        name: newName,
        number: newNumber
      }
      console.log('Pusketaan listaan seuraavat tiedot: ', lisattavaperson)
      setPersons(persons.concat(lisattavaperson))

      //tyhjennetään kentät
      setNewName('')
      setNewNumber('')
      //console.log('Listassa nyt: ', persons)
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  //varsinaisen rungon tulostus
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterMuuttuu={filterMuuttuu} />
      <h2>Add a new</h2>
      <PersonForm addNote={addNote} newName={newName} nimiMuuttuu={nimiMuuttuu} newNumber={newNumber} numeroMuuttuu={numeroMuuttuu} />
      <h2>Numbers</h2>
      <PersonsListForm filteredPersons={filteredPersons} />
    </div>
  )
}

//Person komponentti. Tulostaa yhden ainoa ihmisen tiedot
const Person = (props) => {
  //console.log('Tulostetaan yksittäinen henkilö')
  return (<p key={props.name}>{props.name} {props.number} </p>)
}

//Person-komponentin kattokomponentti. Valmistaa kaikki listan henkilöt tulostamista varten
const PersonsListForm = (props) => {
  console.log('Tulostetaan Ihmisten hallintaan käytetty lista', props)
  return (
    <div>
      {props.filteredPersons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}</div>
  )
}

//Filter vastaa filter-kentän ja tekstin tulostamisesta
const Filter = (props) => (
  <div>
    filter shown with: <input
      value={props.newFilter}
      onChange={props.filterMuuttuu}
    />
  </div>
)

//PersonForm vastaa numero ja nimikentän + add-napin tulostamisesta
const PersonForm = (props) => (
  <form onSubmit={props.addNote}>
    <div>
      name: <input
        value={props.newName}
        onChange={props.nimiMuuttuu}
      />
    </div>
    <div>
      number: <input
        value={props.newNumber}
        onChange={props.numeroMuuttuu}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default App