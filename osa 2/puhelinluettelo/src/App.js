import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  //Handler filtterin muutosten seuraamiseen
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

  //Filtteröidyn listan tulostaminen omana komponenttinaan
  const personsListed = filteredPersons.map(person => {
    console.log('Tulostetaan filtteröidyt ihmiset:', filteredPersons)
    return (
      <p key={person.name}>{person.name} {person.number} </p>
    )
  })

  //Handler panikkeen toiminalle ja uuden nimen lisäämiselle
  const addNote = (event) => {
    event.preventDefault()
    console.log('Saatu sisältö', newName)

    //tämän simppelin rivin naputteluun meni liian kauan
    //Ottaa kaikki moniulotteisen listan name-tiedot ja tiivistää ne yhteen listaan
    const nimet = persons.map(yksittainen => yksittainen.name)
    
    console.log('Nimien listassa nyt:', nimet)

    //jos nimi ei ole vielä listassa
    if(!nimet.includes(newName)) {
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


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input
            value={newFilter}
            onChange={filterMuuttuu}
          />
        </div>
      <h2>Add a new</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input 
            value={newName}
            onChange={nimiMuuttuu}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={numeroMuuttuu}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsListed}
    </div>
  )
}


export default App
