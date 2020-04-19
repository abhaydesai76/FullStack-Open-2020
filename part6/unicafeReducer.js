const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
    average: 0,
    positive: 0, 
    all: 0
}

const unicafeReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GOOD':
            return {
                good: state.good + 1,
                neutral: state.neutral,
                bad: state.bad,
                all: state.all + 1,
                average: ((state.good + 1) - state.bad / (state.all + 1)),
                positive: (((state.good + 1)/(state.all + 1)) * 100)
            }
        case 'NEUTRAL':            
            return {
                good: state.good,
                neutral: state.neutral + 1,
                bad: state.bad,
                all: state.all + 1,
                average: ((state.good - state.bad)/(state.all + 1)),
                positive: ((state.good/(state.all + 1)) * 100)                
            }
        case 'BAD':            
            return {
                good: state.good,
                neutral: state.neutral,
                bad: state.bad  + 1,
                all: state.all + 1,
                average: ((state.good - (state.bad + 1))/(state.all + 1)),
                positive: ((state.good/(state.all + 1)) * 100)                
            }
        default: return state
    }
}

export default unicafeReducer