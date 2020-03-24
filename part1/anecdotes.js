import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () =>
{
    const [selected, setSelected] = useState(0) 
    const [vote,setVote] = useState(0)    
    const [points,setPoints] = useState(new Array(6).fill(0))

    const RandomNumbers = () => {
        setVote(0)

        const number = Math.floor((Math.random() * 6));    
        setSelected(number)
        // console.log(number)
    }

    const RegisterVote = () =>
    {        
        setVote(vote + 1)             

        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)

        // points[selected] += 1
        // setPoints(points)
        // console.log(points)
    }

    return (
        <div>      
            <b>Anecdote of the day</b>
            <p />      
            {anecdotes[selected]}
            <p />
            has {vote} votes
            <p />
            <button onClick={RegisterVote}>vote</button>
            <button onClick={RandomNumbers}>next anecdote</button>
            <p />
            <b>Anecdote with most votes</b>
            <p />
            {anecdotes[points.indexOf(Math.max(...points))]} 
            <p />
            has {Math.max(...points)} votes            
            <p />            
        </div>
    )
}

const anecdotes = [
    'if it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root')) 