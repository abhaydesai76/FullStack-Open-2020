const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const  pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
// const uuid = require('uuid/v1')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.set('useFindAndModify', false)

const MONGODB_URI= 'mongodb+srv://fullstack:fullstack2020@fullstack2020-qltr6.mongodb.net/library?retryWrites=true'

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })
// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// /*
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
// */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Book {
    title: String!    
    author: String!
    published: Int!
    genres: [String!]
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    bookcount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
      authorCount: Int!      
      findBooksByAuthor(author: String): [Book!]
      findBooksByGenre(genre: String): [Book!]
      allBooks: [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
      addBook(
        title: String!        
        author: String!
        published: Int!
        genres: [String!]
      ): Book

      editAuthor(
        name: String!
        born:Int!        
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      authorCount: () => Author.collection.countDocuments(),
      // authorCount: () => authors.length,
      
      findBooksByAuthor: (root, args) => {
        if (!args.author) {
            return Book
        }

        return Book.findOne({ author: args.author })        
      },
      // findBooksByAuthor: (root, args) => {
      //   if (!args.author) {
      //       return books
      //   }

      //   return books.filter(b => b.author === args.author)        
      // },

      findBooksByGenre: (root, args) => {
        if (!args.genre) {
            return Book
        }
        
        return Book.findOne({ genres: args.genre })
      },
      // findBooksByGenre: (root, args) => {
      //   if (!args.genre) {
      //       return books
      //   }
        
      //   return books.filter(b => b.genres.includes(args.genre))
      // },

      allBooks: () => { return Book.find({}) },
      // allBooks: () => { return Book.find({}).populate('author') },
      // allBooks: () => { return books },

      allAuthors: () => {         
        // db.Author.find().forEach(function(author)  
        // {
        //   console.log('value of author :', author.name)
        //   let bookCount = 0;        
        //   let authorBookCount = Author.findOne({ name: author.name })   
        //   console.log('value of authorBookCount :', authorBookCount)           

        //   db.Book.find().forEach(book)  
        //   {
        //     console.log('value of book :', book)           
        //     if (book.author.toLocaleLowerCase() === authorBookCount.name.toLocaleLowerCase())
        //     {
        //       bookCount = bookCount + 1
        //     }            
        //   }
        //   console.log(`value of bookCount is ${bookCount}`)
         
        //   Author.bookCount = bookCount
        //   Author.save()
        // })
        
        return Author.find({})        
      }
      // allAuthors: () => { 
      //   for (let author in authors)
      //   {
      //     let bookCount = 0;        
      //     let authorBookCount = authors.find(a => a.name === authors[author].name)              

      //     for (book in books)
      //     {
      //       if (books[book].author.toLocaleLowerCase() === authorBookCount.name.toLocaleLowerCase())
      //       {
      //         bookCount = bookCount + 1
      //       }            
      //     }
      //     console.log(`value of bookCount is ${bookCount}`)
         
      //     const updatedAuthorBookCount = {...authorBookCount, bookCount: bookCount}         
      //     console.log(updatedAuthorBookCount)

      //     authors = authors.map(a => a.name === updatedAuthorBookCount.name ? updatedAuthorBookCount : a)
      //     authors.concat(updatedAuthorBookCount)
      //   }
        
      //   return authors 
      // }
  },

  Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
        
        // if (Book.findOne({ title: args.title })) {
        //     throw new UserInputError('Book Title must be unique', {
        //         invalidArgs: args.name
        //     })
        // }

        const book = new Book({ ...args })
        
        try {
          await book.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      },
      // addBook: (root, args) => {
      //   if (books.find(b => b.title === args.title)) {
      //       throw new UserInputError('Book Title must be unique', {
      //           invalidArgs: args.name
      //       })
      //   }

      //   const book = { ...args, id: uuid() }
      //   books = books.concat(book)
      //   return book
      // },

      editAuthor: async (root, args, { currentUser }) => {
        
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        
        const author = await Author.findOne( { name: args.name })    
        
        if (!author)
        {
            return null
        }
        
        author.born = args.born 
        
        try {
          await author.save()
        }
        catch (error){
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        return author
      },
      // editAuthor: (root,args) => {
      //   const author = authors.find(a => a.name === args.name)    

      //   if (!author)
      //   {
      //       return null
      //   }

      //   const updatedAuthor = { ...args, born: args.born }
      //   authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      //   return updatedAuthor
      // }

      createUser: async (root, args, { currentUser }) => {

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const user = new User({ username: args.username })

        return await user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          })
      },

      login: async (roor, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'bkhulla')
        {
          throw new UserInputError('wrong credentials')
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([ 'BOOK_ADDED' ])
    }
  }
}
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer '))
    {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})