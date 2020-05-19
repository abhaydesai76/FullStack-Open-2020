import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from  './components/LoginForm'
import Recommendation from './components/Recommendation'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)  
  const [token, setToken] = useState(null)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)  
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
    }
  })

  useEffect( () => {
    const token = localStorage.getItem('library-token')

    if (token) {
      setToken(token)
    }
  }, [])

  if (resultAuthors.loading)
  {
    return <div>...loading Authors</div>
  }

  if (resultBooks.loading)
  {
    return <div>...loading Books</div>
  }

  // if ((resultAuthors.data === null) || (resultAuthors.data === undefined))
  // {
  //   return <div>... No Author data present</div>
  // }

  // if ((resultBooks.data === null) || (resultBooks.data === undefined))
  // {
  //   return <div>... No Book data present</div>
  // }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // const handleLogin = async (event) => {
  //   event.preventDefault()    
    
  //   try {
  //     localStorage.removeItem('library-token')

  //     const token = await Login( { variables: { username, password } })
  //     console.log('value of token after handleLogin :', token)
  //     setToken(token)
      
  //     localStorage.setItem('library-token', token.data.login.value)
  //   }    
  //   catch (exception) {
  //     setErrorMessage('Wrong credentials')
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000)
  //   }
  // }

  if (!token) {
    return (
      <div>
        You need to login first...      
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
      <div>
        <div>
          <button onClick={logout} >logout</button>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendation')}>recommendation</button>
        </div>

        <Authors
          show={page === 'authors'}
          authors = {resultAuthors.data.allAuthors}
        />

        <Books
          show={page === 'books'}
          books= {resultBooks.data.allBooks}
        />

        <NewBook
          show={page === 'add'}
          updateCacheWith={updateCacheWith}
        />

        <Recommendation
          show={page === 'recommendation'}
          books= {resultBooks.data.allBooks}
        />
      </div>              
  )
}

export default App