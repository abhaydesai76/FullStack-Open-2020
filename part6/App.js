import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import AnecdotesFilter from './components/AnecdotesFilter'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {    

    const notification = useSelector(state => state.notification)
    console.log('notification : ', notification)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(initializeAnecdotes())
    }, [dispatch])

    return (
      <div> 
        {notification && <Notification />}        
        <p />
        <AnecdotesFilter />        
        <AnecdoteList />   
        <p />
        <AnecdoteForm />     
      </div>
    )
  
}

export default App