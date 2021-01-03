import React, { useState, useEffect } from 'react'
import numbersService from './services/numbersService'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  //useEffect hakee sovelluksen tiedot JSON muodossa palvelimelta käyttäen numberService luokan axiosia
  useEffect(() => {
    console.log('effect alkaa')
    numbersService
      .getAll()
      .then(response => {
        console.log('effect -> promise fulfilled', response)
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

    //uunen henkilön tietojen atribuutit
    const lisattavaperson = {
      name: newName,
      number: newNumber
    }

    //jos nimi ei ole vielä listassa
    if (!nimet.includes(newName)) {
      console.log('Pusketaan listaan seuraavat tiedot severille: ', lisattavaperson)

      //2.15, lähetetään uusi persons-tieto palvelimelle
      numbersService
        .create(lisattavaperson)
        .then(response => {
          setPersons(persons.concat(response.data))
          console.log('Palvelin vastasi uuteen tietoon:', response)
          //tyhjennetään kentät
          setNewName('')
          setNewNumber('')

          //tulostetaan ilmoitus onnistuneesta lisäyksestä
          setErrorMessage(
            `Added ${lisattavaperson.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      console.log('Listassa nyt: ', persons)
    }

    //2.18 nimi on jo listassa, tarjotaan mahdollisuutta päivittää se
    else {
      //jos ikkunasta klikataan OK, lähetetään numberService komponentille Axionille PUT update käsky
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        //tämän rivin kirjoittamiseen meni liian kauan
        const lisattavanID = persons.filter(haeid => haeid.name === lisattavaperson.name)
        
        //päivitetään vanha tieto
        numbersService
          .update(lisattavanID[0].id, lisattavaperson)
          .then(response => {
            console.log('Palvelin vastasi uuteen tietoon:', response)
            setPersons(persons.concat(response.data))
            //tyhjennetään kentät
            setNewName('')
            setNewNumber('')

            //tulostetaan ilmoitus onnistuneesta tiedon muuttamisesta
            setErrorMessage(
              `Updated number for ${lisattavaperson.name}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }

  }

  //varsinaisen rungon tulostus
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter newFilter={newFilter} filterMuuttuu={filterMuuttuu} />
      <h2>Add a new</h2>
      <PersonForm addNote={addNote} newName={newName} nimiMuuttuu={nimiMuuttuu} newNumber={newNumber} numeroMuuttuu={numeroMuuttuu} />
      <h2>Numbers</h2>
      <PersonsListForm filteredPersons={filteredPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

//Person komponentti. Tulostaa yhden ainoa ihmisen tiedot, sekä poistamiseen käytetty painike
const Person = (props) => {
  return (<p key={props.id}>{props.name} {props.number}
    <button onClick={() => {
      const messege = 'Delete ' +props.name
      console.log(messege)
      if (window.confirm(messege)) {
        //jos ikkunasta klikataan OK, lähetetään numberService komponentille Axionille delete käsky
        console.log('Klikattu poista henkilöön:', props.name, 'jonka ID on', props.id)
        numbersService
          .remove(props.id)
          .then(response => {
            console.log('Palvelin vastasi uuteen tietoon:', response)

            //tulostetaan ilmoitus tiedon onnistuneesta poistamisesta
            props.setErrorMessage(
              `Deleted ${props.name}`
            )
            setTimeout(() => {
              props.setErrorMessage(null)
            }, 5000)
          })
          //
          .catch(error => {
            console.log('Virhe poistaessa, tulostetaan virheilmoitus')
            props.setErrorMessage (
              `Name and number were already removed from server`
            )
            setTimeout(() => {
              props.setErrorMessage(null)
            }, 5000)})
      }
    }

    }>delete</button></p>)
}

//Person-komponentin kattokomponentti. Valmistaa kaikki listan henkilöt tulostamista varten
const PersonsListForm = (props) => {
  console.log('Tulostetaan Ihmisten hallintaan käytetty lista', props)
  return (
    <div>
      {props.filteredPersons.map(person =>
        <Person key={person.id} name={person.name} number={person.number} id={person.id} setErrorMessage={props.setErrorMessage}/>
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

//Ilmoitusten tulostamiseen käytetty komponentti. Saa parametrinä tulostettavan viestin
const Notification = ({ message }) => {
  //Mikäli viestikentän tulee olla tyhjänä
  if (message === null) {
    return null
  }
  //Virhetilannetta varten varattu viesti
  else if (message === `Name and number were already removed from server`) {
    return (
      <div className="fail">
        {message}
      </div>
    )
  }

  //tavallisen ilnmoituksen (poisto, lisäys ja päivitys) tulostaminen
  return (
    <div className="success">
      {message}
    </div>
  )
}

export default App