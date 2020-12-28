import React from 'react';

//Tulostaa headerin
const Header = ({ course }) => {
  console.log('Header tulostettu:', course)
  return (
    <h1>{course}</h1>
  )
}

//tulostetaan tehtävien yhteenlaskettu summa
const Total = ({ course }) => {
  console.log('Aloitetaan yhteenlaskeminen')
  //kerätään kaikki parts.exercises omaan taulukkoon
  const lista = course.parts.map((list) => list.exercises)
  console.log('Uudelleen listattu sisältö:', lista)
  
  //lasketaan lukumäärä yhteen
  const total = lista.reduce( (s, p) => s+p )
  console.log('Listassa yhteensä kpl:', total)
  
  return(
    <b>total of {total} exercises</b>
  ) 
}

//Määrittelee yhden tulosttevan rivin listaan
const Part = (props) => {
  
  return (
    <p>
      {props.name} {props.exercises}
    </p>    
  )
}

//Tulostaa sivuston listan sisällön
const Content = ({ course }) => {
  console.log('Aloitetaan sivuston sisällön tulostaminen');
  console.log('Rakennettava sisältö:', course);
  
  return (
    <div>
      {course.map(asd =>
      <Part key={asd.id}
      name={asd.name}
      exercises={asd.exercises}
      />
      )}
    </div>
  )
}

//Sivun sisällön määrittely
const Course = ({ course }) => {
  console.log('Aloitetaan sivun rakentaminen')
  console.log('Sisältö aloituksessa:', course)

  return (
    <div>
    <Header course={course.name} />
    <Content course={course.parts} />
    <Total course={course} />
    </div>
  )
}

export default Course