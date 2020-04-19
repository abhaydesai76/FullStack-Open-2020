import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {    
    console.log(createAnecdote)
    console.log(props.createAnecdote)

    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdote.value    
    
        event.target.anecdote.value = ''
    
        // const newAnecdote = await anecdoteService.createNew(content)
        // dispatch(createAnecdote(content))        
        props.createAnecdote(content)

        props.displayNotification(`You have created a new anecdote '${content}'`, 5000 )
        // dispatch(displayNotification(`You have created a new anecdote '${content}'`, 5000 ))
        // dispatch(displayNotification(`You have created a new anecdote '${content}'`, 'DISPLAY' ))
        // setTimeout(() => {
        //   dispatch(hideNotification())
        // }, 5000)
    
      }

      return (                  
          <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
          </form>        
      )
    }

// export default AnecdoteForm
export default connect(null, { createAnecdote, displayNotification })(AnecdoteForm)