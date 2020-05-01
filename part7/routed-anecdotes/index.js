import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import RouterAppBootstrap from './RouterAppBootstrap'
// import RouterAppMaterial from './RouterAppMaterial'
import RouterAllStyled from './RouterAppStyled'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render
(<Router>
    <App />
    {/* <RouterAppBootstrap /> */}
    {/* <RouterAllStyled /> */}
</Router>, 
document.getElementById('root'))