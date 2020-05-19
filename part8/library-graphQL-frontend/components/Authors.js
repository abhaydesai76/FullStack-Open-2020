import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {  
  const [name, setName] = useState('')
  const [ born, setBorn ] = useState('')

  const [ editAuthorBirthYear, result] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })  
  
  const updateAuthorBirthYear = async (event) => {
    event.preventDefault()

    console.log(`value of name before updating birthYear ${name}`)
    editAuthorBirthYear({ variables : { name, born } })

    setName('')
    setBorn('')
  }

  const handleChange = async (event) => {
    setName(event.target.value);
  }

  useEffect(() => {
    if (result.data && result.data.editAuthorBirthYear === null)
    {
      // setError('author not found')
    }
  }, [result.data]) // eslint-disable-line   

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born === 0 ? '0000' : a.born}</td>
              <td>{a.bookcount === 0 ? '0' : a.bookcount}</td>
            </tr>
          )}
        </tbody>        
      </table>
      <h2>Set BirthYear</h2>
      <form onSubmit={updateAuthorBirthYear}>
        <div>
        {/* name <input value={name} onChange={({ target }) => setName(target.value)} /> */}
        <label>          
        Pick Author for which you want to update BirthYear:
        </label>
        <p />
        <select value={name.value} onChange={handleChange}>
          <option value="Robert Martin">Robert Martin</option>
          <option value="Martin Fowler">Martin Fowler</option>
          <option value="Fyodor Dostoevsky">Fyodor Dostoevsky</option>
          <option value="Joshua Kerievsky">Joshua Kerievsky</option>
          <option value="Sandi Metz">Sandi Metz</option>
        </select>        
        </div>
        <div>
        BirthYear <input value={born} onChange={({ target }) => setBorn(Number(target.value))} />
        </div>
        <button type='submit'>set BirthYear</button>
      </form>
    </div>
  )
}

export default Authors
