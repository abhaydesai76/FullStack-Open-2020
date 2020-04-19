import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {    

    // const dispatch = useDispatch()

    // const anecdotes = useSelector(( { filter, anecdotes }) => {
    //     // console.log('filter :' , filter)
    //     // console.log('anecdotes 1 : ', anecdotes)

    //     if (filter === '*')
    //     {
    //         return anecdotes
    //     }                                
        
    //     anecdotes = anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
    //     // console.log('anecdotes 2 : ', anecdotes)
    //     return anecdotes        
    // })

    // const anecdotesToShow = () => {
        // if (props.filter === 'ALL')
        // {
        //     return props.anecdotes
        // }

        // return props.filter(anecdote => anecdote.content.toLocaleLowerCase().indexOf(props.filter.toLocaleLowerCase()) !== -1)
    // }

    const vote = (id, content, votes) => {
        props.voteAnecdote(id, content, votes === undefined ? 1 : votes + 1)
        props.displayNotification(`You have voted '${content}'`, 5000)
        // dispatch(voteAnecdote(id, content, votes === undefined ? 1 : votes + 1))
        // dispatch(displayNotification(`You have voted '${content}'`, 5000))
        // dispatch(displayNotification(`You have voted '${content}'`, 'DISPLAY'))
    }

    return (
        <div>
        <h2>Anecdotes</h2>        
        {props.anecdotes.sort(function (a,b) {return b.votes - a.votes}).map(anecdote =>
        // {anecdotes.sort(function (a,b) {return b.votes - a.votes}).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}              
                <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                </div>
            </div>
            )}      
        </div>
        )
}

const mapStateToProps = (state) => {
    
    return { anecdotes : state.filter === "*" 
        ? state.anecdotes 
        : state.anecdotes.filter((anecdote => anecdote.content.toLocaleLowerCase().indexOf(state.filter.toLocaleLowerCase()) !== -1))}

    // return {
    //     anecdotes: state.anecdotes,
    //     filter: state.filter
    // }
}

const mapDispatchToProps = {
    voteAnecdote,
    displayNotification
}

// export default AnecdoteList
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)