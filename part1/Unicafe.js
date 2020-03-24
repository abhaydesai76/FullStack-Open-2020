import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ values, text }) => {
    return (
        <div>        
            {text}:{values}                    
        </div>
    )
        
}

const Statistics = (props) =>
{
    if ((props.good === 0) && (props.neutral === 0) && (props.bad === 0))
    {
        return (
            <div>
                No feedback given 
            </div>
        )
    }

    return (        
            <table>      
                <tbody>           
                    <tr>                
                        good:{props.good}
                    </tr>                                      
                    <tr>
                        neutral:{props.neutral}
                    </tr>
                    <tr>
                        bad:{props.bad}
                    </tr>
                    <tr>
                        all:{props.all}
                    </tr>
                    <tr>
                        <Statistic text="average" values={props.average}/>
                        {/* average: {props.average} */}
                    </tr>
                    <tr>
                        positive:{props.positive} % 
                    </tr>                
                </tbody>
            </table>                                          
        )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)


const App = () => {    

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    const handleGood = () =>
    {
        setGood(good +1)
        setNeutral(neutral)
        setBad(bad)
        setAll(all + 1)
        setAverage((good + 1) - bad / (all + 1))
        setPositive(((good + 1)/(all + 1)) * 100)
    }

    const handleNeutral = () =>
    {
        setGood(good)
        setNeutral(neutral + 1)
        setBad(bad)
        setAll(all + 1)
        setAverage((good-bad)/(all + 1)) 
        setPositive((good/(all + 1)) * 100)
    }

    const handleBad = () =>
    {
        setGood(good)
        setNeutral(neutral)
        setBad(bad + 1)
        setAll(all + 1)
        setAverage((good- (bad + 1))/(all + 1)) 
        setPositive((good/(all + 1)) * 100)        
    }

    return (
        <div>
            give feedback
            <p />                        
                <Button onClick={handleGood} text="good" />
                {/* <button onClick={handleGood}>Good</button> */}
                <Button onClick={handleNeutral} text="neutral" />
                {/* <button onClick={handleNeutral}>Neutral</button> */}
                <Button onClick={handleBad} text="bad" />
                {/* <button onClick={handleBad}>Bad</button>    */}
                <p />                                    
                statistics 
                <p />   
                {/* good: {good}      
                <p /> 
                neutral: {neutral}
                <p /> 
                bad: {bad}
                <p /> 
                all: {all}
                <p /> 
                average: {average}
                <p />  
                positive: {positive} % 
                <p />                      */}
                <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />              
            <p />        
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
