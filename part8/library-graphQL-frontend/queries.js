import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        id
        title
        author
        published
        genres
    }
`

export const ALL_AUTHORS = gql`query {
    allAuthors {
        name
        born   
        bookcount     
    }
}
`

export const ALL_BOOKS = gql`query {
    allBooks {
        title        
        author
        published
        genres
    }
}
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(
            title: $title,            
            author: $author,
            published: $published,
            genres: $genres
            ) {                 
                title                
                author
                published
                genres                
            }
}
`

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthorBrithYear($name: String!, $born: Int!) {
        editAuthor(
            name: $name,
            born: $born
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value            
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query findBooksByGenre($genreToSearch: String) {
        findBooksByGenre(genre: $genreToSearch) {
            title        
            author
            published     
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`