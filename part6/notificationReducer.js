// const notificationAtStart = 'Test Notification 1 on 17th April, 2020'

// const initialState = notificationAtStart

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'DISPLAY':
            return action.data
        case 'HIDE':
            return null
        default:
            return state
    }
}

export const displayNotification = (notification, timeout) => {
    return async dispatch => {        
        dispatch({
            type: 'DISPLAY',
            data: notification,                 
        })
        setTimeout(() => {
            dispatch(hideNotification())
            }, timeout)        
    }    
}

// export const displayNotification = (notification) => {
    
//     return {
//         type: 'DISPLAY',
//         data: notification        
//     }
// }

export const hideNotification = (notification) => {
    
    return {
        type: 'HIDE',
        data: null 
    } 
}

export default notificationReducer