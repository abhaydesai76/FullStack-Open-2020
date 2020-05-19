import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-token')
    console.log('value of token : ', token)

    return {
        headers: { 
            ...headers,
            authorization: token ? `bearer ${token}` : "",
        }
    }
})

// const httpLink = createHttpLink({ uri: 'http://localhost:4000' })
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const wsLink = new WebSocketLink({ 
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
    }})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)

        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
    },
    wsLink, authLink.concat(httpLink)
)
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({ uri: 'http://localhost:4000'})
// })

// const query = gql `
// query {
//     allAuthors {
//         name
//         born
//         bookCount
//      }
// }
// `
// client.query({ query })
//  .then((response) => {
//     console.log(response.data)
//  })

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
document.getElementById('root'))