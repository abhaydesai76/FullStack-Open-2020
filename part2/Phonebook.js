import React, { useState, useEffect } from 'react'
import personService from '../services/personsService'
import Notification from '../Components/Notification'
import '../../src/index.css'

const Filter = (props) =>
{
    return (
        <div>
            filter shown with <input onChange={props.handleChange}/>
        </div>
    )
}

const PersonForm = (props) =>
{
    return (
        <div>
            <form onSubmit={props.addPersonDetails}>
                <div>
                    name: <input value={props.newName} onChange={props.handleNameChange}/>
                </div>
                <p />
                <div>
                    number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
                </div>
                <p />
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>            
        </div>
    )
}

const App = () =>
{
    const [persons,setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')    
    const [filterName, setFilterName]  = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleNameChange = (event) =>
    {        
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) =>
    {        
        setNewNumber(event.target.value);
    }

    const handleNameFilter = (event) =>
    {        
        setFilterName(event.target.value);
    }

    useEffect(() => {
        personService.getAll()
            .then(response  => {
                setPersons(response)
            })
            .catch(error => {
                setErrorMessage(
                    `Error occurred while retrieving person data from server`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
              })
        }, [])

    const addPersonDetails = (event) =>
    {
        event.preventDefault();

        const nameObject = {            
            name: newName,          
            number: newNumber,
        }

        if (persons.find( ({name}) => name.toLocaleLowerCase() === newName.toLocaleLowerCase()))
        {
            // window.alert(`${newName} is already added to phonebook`)
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true)
            {
                window.alert(`time to update record`)
                
                updatePersonDetails(persons,nameObject)
            }
            else
            {
                window.alert(`doesn't want to update`)
            }
        }
        else{
            setPersons(persons.concat(nameObject))

            personService.create(nameObject)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
                setErrorMessage(`Added ${newName}`)
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
            })
            .catch(error => {
                setErrorMessage(
                    `Error occurred while saving person data on server`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
              })              
        }
    }

    const updatePersonDetails = (persons,updateObject) =>
    {
        const personToUpdate = persons.filter(person => person.name.toLocaleLowerCase() === updateObject.name.toLocaleLowerCase())

        personService.update(personToUpdate[0].id, updateObject)
            .then(response => {            
            setPersons(persons.map(person => person.id !== response.id ? person : response))                       
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Updated ${updateObject.name}`)
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
            })
            .catch(error => {
                setErrorMessage(                    
                    `The person '${updateObject.name}' was already deleted from server`
                  )
                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 5000)
                  setPersons(persons.filter(person => person.id !== personToUpdate[0].id))
            })
    }

    const Persons = (props) =>
    {
        return (
            <div>
                <ul>
                    {props.personsToShow.map((person,i) => 
                        <li key={i}>{person.name} {person.number} <button onClick={ () => DeletePerson(props.personsToShow, person.id)}>delete</button></li>                    
                    )}
                </ul>
            </div>
        )
    }

    const DeletePerson = (persons, id) =>
    {
        window.alert(`Delete ` + persons.find(n => n.id === id).name + ` with id ${id} ?`)        
        const personsToShow = persons.filter(person => person.id !== id)                         

        personService.remove(id)
        .then(response => {            
            setNewName('')
            setNewNumber('')
        })
        .catch(error => {
            setErrorMessage(
                `Error occurred while deleting person data on server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
          })             

          setPersons(personsToShow)
    }

    const personsToShow = filterName === "" ?  persons : persons.filter(person => person.name.toLocaleLowerCase().indexOf(filterName.toLocaleLowerCase()) !== -1);   

    return (
        <div>
            <h2>Phonebook</h2>
            
            <Notification message={errorMessage} />
            
            <Filter handleChange={handleNameFilter}/>
            
            <h3>Add a new</h3>
            <PersonForm newName={newName} newNumber={newNumber}
                    addPersonDetails={addPersonDetails}
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange}/>
            
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} />
            
        </div>
    )    
}

export default App;
