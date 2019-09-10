import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Contact from './components/Contact'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/people')
      .then(response => {
        setContacts(response.data)
      })
  }, [])


  const contactsToShow =  
    showAll
    ? contacts
    : contacts.filter(
      contact =>
        contact.name.toUpperCase().search(filterBy.toUpperCase()) > -1
      )


  const rows = () => contactsToShow.map(contact =>
    <Contact
      key={contact.name}
      name={contact.name}
      number={contact.number}
    />
  )
  
  const handleContactNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleContactNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    console.log(newNumber);
  }

  const handleFiltering = event => {
    console.log(event.target.value)
    setFilterBy(event.target.value)
    setShowAll(false)
    console.log(filterBy);
  }

  const addContact = (event) => {
    event.preventDefault()
    // 
    if(newName === '') return true
    if(newNumber === '') return true

    let dup = false
    contacts.forEach(contact => {
      if (contact.name === newName) dup = true;
    })

    if (!dup) {
      const contactObject = {
        name: newName,
        number: newNumber
      }
  
      setContacts(contacts.concat(contactObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addContact}>
      <div>
        Filter:<input value={filterBy} onChange={handleFiltering}/>
      </div>
        Name: <input
          value={newName} 
          onChange={handleContactNameChange}
        /><br/>
        Number: <input
          value={newNumber} 
          onChange={handleContactNumberChange}
        /><br/>
        <button type="submit">save</button>
      </form>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App 