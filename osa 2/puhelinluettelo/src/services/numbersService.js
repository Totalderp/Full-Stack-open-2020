import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
//Tämä komponentti vastaa REST kommunikoinnista tietokannankanssa käyttäen AXIOS react lisäosaa

//palauttaa kaikki tiedot
const getAll = () => {
  return axios.get(baseUrl)
}

//luo uuden resurrien tietokantaan
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

//Päivittää annetun id:n tiedot
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

//poistaa tiedon
const remove = (id) => {
    console.log('Poistetaan käyttäjä ID:', id)
    console.log('Osoitteesta', baseUrl, id)
    return axios.delete(`${baseUrl}/${id}`)
}

//exportattavat funktiot
export default { 
  getAll: getAll, 
  create: create,
  remove: remove,
  update: update 
}