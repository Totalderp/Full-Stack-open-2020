import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  //Handler tekstikentän päivittämistä varten
  const handleNoteChange = (event) => {
    console.log('tekstikenttä muuttuu:', event.target.value)
    setNewName(event.target.value)
    
  }

  //Handler panikkeen toiminalle ja uuden nimen lisäämiselle
  const addNote = (event) => {
    event.preventDefault()
    console.log('Saatu sisältö', event.value)
    console.log('Mitäs täällä tapahtuu', persons.includes(event.value))
    if(!persons.includes(event.value)) {
      const lisattavaperson = {
        name: newName,
        id: newName
      }
      console.log('Pusketaan listaan seuraavat tiedot: ', lisattavaperson)
    
      setPersons(persons.concat(lisattavaperson))
      setNewName('')
      console.log('Listassa nyt: ', persons)
    }
    else {
      alert("Läski idiootti")
    }
      
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.map(person => {
           return <li key = {person.id}>  {person.name} </li>
        })}
      </ul>
    </div>
  )

}


export default App
