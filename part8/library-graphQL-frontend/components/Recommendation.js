import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Recommendation = (props) => {

    const [booksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE)  
    const [books, setBooks] = useState(null)

    const showBooks = (genre) => {
        booksByGenre( { variables: { genreToSearch: genre }})
    }

    useEffect(() => {
        if (result.data)
        {
            setBooks(result.data.books)
        }
    }, [result.data])      
    
    if (!props.show) {
        return null
    }

    if (props.books) {
        return (
            <div>
                <h2>recommendation</h2>
                <p />
                <h3>books in your favorite genre</h3>
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
                {props.books.map(a => 
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author}</td>
                    <td>{a.published}</td>
                </tr>
                )}                    
                </tbody>
                </table>
            </div>
        )
    }
    else
    {
        return (
            <div></div>
            // <div>This user doesn't have any preferred genre.</div>
        )
    }
}

export default Recommendation