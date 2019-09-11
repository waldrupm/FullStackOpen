import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [findCountry, setFindCountry] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const countriesToShow = showAll 
    ? countries 
    : countries.filter(country => 
        country.name.toUpperCase().search(findCountry.toUpperCase()) > -1
      )


  const rows = () => countriesToShow.map(country =>
    <Country
      name={country.name}
      capital={country.capital}
      population={country.population}
      languages={country.languages}
      flag={country.flag}
      key={country.name}
    />
  )
  
  const handleFindCountryChange = (event) => {
    console.log(event.target.value)
    setFindCountry(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <form>
        Filter: <input
          value={findCountry} 
          onChange={handleFindCountryChange}
          />
      </form>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App 