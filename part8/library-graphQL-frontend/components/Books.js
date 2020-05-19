import React, { useState } from 'react'

const Books = (props) => {

  const [genreFilter, setGenreFilter] = useState(null)  

  if (!props.show) {
    return null
  }

  const selectGenre = (genretype) => {
    setGenreFilter(genretype)
  }

  return (
    <div>
      <h2>books</h2>
      <p />
      <h3>in genre : {genreFilter}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>          
            {props.books.filter(b => b.genres.includes(genreFilter))
            .map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div>
        <button type="button" onClick={() => selectGenre("refactoring")}>refactoring</button>        
        <button type="button" onClick={() => selectGenre("agile")}>agile</button>
        <button type="button" onClick={() => selectGenre("patterns")}>patterns</button>
        <button type="button" onClick={() => selectGenre("design")}>design</button>
        <button type="button" onClick={() => selectGenre("crime")}>crime</button>
        <button type="button" onClick={() => selectGenre("classic")}>classic</button>
        <button type="button" onClick={() => selectGenre("revolution")}>revolution</button>
        <button type="button" onClick={() => selectGenre("all")}>all genres</button>
      </div>
    </div>
  )
}

export default Books