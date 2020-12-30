import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas', number: '040-1231244' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

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
        id: newName,
        number: newNumber
      }
      console.log('Pusketaan listaan seuraavat tiedot: ', lisattavaperson)
      setPersons(persons.concat(lisattavaperson))
      
      //tyhjennetään kentät
      setNewName('')
      setNewNumber('')
      console.log('Listassa nyt: ', persons)
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
      
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => {
        return <p key = {person.id}>  {person.name} {person.number} </p>
      })}
    </div>
  )
}


export default App
