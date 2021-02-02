//Mongo DB Atlakseen asetettavan tietokannan testaamiseen käytetty luokka
//Vaati salasanan komentokehotteessa toimiakseen
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

//Databasen URL
const url = `mongodb+srv://fullstack:${password}@clusterphonebook.2vhqp.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//tietokanna schema
const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Note = mongoose.model('Note', noteSchema)

//jos parametrejä useampi kun >process.argv[2] luodaan uusi tieto databaseen
if (process.argv.length > 3) {
    //uuden tiedon luomiseen käytetty konstruktori
    //kaivetaan tiedot komentokehotteessa annetuista argumenteista
    const note = new Note({
        name: process.argv[3],
        number: process.argv[4],
    })

    //Tiedon lähettäminen, tallentaminen ja yhteyden sulkeminen
    note.save().then(response => {
        console.log('note created, saved and connection closed!')
        mongoose.connection.close()
    })
}

//muissa tilanteissa palautetaan kaikki tietokannan data
else {
    //tietojen hakemiseen ja palauttamiseen käytetty koodi
    //{} sisälle voidaan kirjoittaa hakuehto esim. {name: Esa Esimerkki}
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}