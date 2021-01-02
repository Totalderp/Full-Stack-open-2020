import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  //lataa maat tietokannasta
  useEffect(() => {
    console.log('effect alkaa')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('effect -> promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('Maiden tietoja löydetty:', countries.length, 'kpl')

  //Handler filtterin päivittämistä varten
  const filterMuuttuu = (event) => {
    console.log('filtterikenttä muuttuu:', event.target.value)
    setNewFilter(event.target.value)
  }

  //maalistan filtteröiminen annetulla filtterillä caseINsensitiivisesti
  const filteredCountries = countries.filter(country => {
    return country.name.toLocaleLowerCase().includes(newFilter.toLowerCase())
  })

  return (
    <div>
      <Filter newFilter={newFilter} filterMuuttuu={filterMuuttuu} />
      <CountriesListed filteredCountries={filteredCountries} setNewFilter={setNewFilter}/> 
    </div>
    
  )
}

//Filter vastaa filter-kentän ja tekstin tulostamisesta
const Filter = (props) => (
  <div>
    find countries: <input
      value={props.newFilter}
      onChange={props.filterMuuttuu}
    />
  </div>
)

//Country-komponentin kattokomponentti. Filtteröi ja valmistaa kaikki listan maat tulostamista varten
const CountriesListed = (props) => {
  console.log('Tulostetaan maiden hallintaan käytetty lista', props)
  console.log('Listan pituus ', props.filteredCountries.length)

  if(props.filteredCountries.length === 1){
    console.log('Tulostetaan yksittäisen maan tiedot')
    return(
      <div>
        <h1>{props.filteredCountries[0].name}</h1>
        <p>capital {props.filteredCountries[0].capital}</p>
        <p>population {props.filteredCountries[0].population}</p>
        <h2>languages</h2>
        <ul> 
        {props.filteredCountries[0].languages.map(kieli =>
          <Language name={kieli.name} />
        )}
        </ul>
        <img src={props.filteredCountries[0].flag} alt="flag" width="200" height="128"></img>
      </div>
    )
  }else if(props.filteredCountries.length <= 10) {
    console.log('Tulostetaan rypäs maita ja props', props)
    return (
      <div>
        {props.filteredCountries.map(land =>
          <Country name={land.name} setNewFilter={props.setNewFilter}/>
        )}</div>
    )
  }else {
    console.log('Yli 10 maata fillterin perusteella')
    return (
      <p>Too many matches, spesify another filter</p>
    )
  }
  
}

//Language komponentti. Tulostaa li muodossa yhden ainoan kielen
const Language = (props) => {
  console.log('Tulostetaan yksittäinen puhekieli: ', props.name)
  return (<li key={props.name}>{props.name}</li>)
}

//Country komponentti. Tulostaa yhden ainoa maan tiedot
const Country = (props) => {
  

  console.log('Tulostetaan yksittäinen maa ja props:', props)
  return (<p key={props.name}>{props.name} <button onClick={() => props.setNewFilter(props.name)}>show</button></p>)
}

export default App;
