// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  console.log('action : ', action)
  switch (action.type) {
    case 'NEW_ANECDOTE' :
      return [...state, action.data]
    case 'INIT_ANECDOTE' :
      return action.data
    case'VOTE' :
      const anecdoteId = action.data.anecdoteId
      
      const anecdoteToVote = state.find(i => i.id === anecdoteId)
      
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
 
      return state.map(anecdote => anecdote.id !== anecdoteId ? anecdote : changedAnecdote)
    default :  
      return state
  }  
}  

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }  
}

export const voteAnecdote = (anecdoteId, content, votes) => {
  // console.log('anecdoteId : ', anecdoteId)
  // console.log('content : ', content)
  // console.log('votes : ', votes)
  return async dispatch => {
    const updateVotes = await anecdoteService.updateVotes(anecdoteId, content, votes)
    dispatch({
      type: 'VOTE',
      data: updateVotes
    })
  }  
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({   
        type: 'INIT_ANECDOTE',
        data: anecdotes   
    })
  }  
}

export default anecdoteReducer