require('dotenv').config()

const express = require('express')
const app = express()

const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')
const PORT = process.env.PORT

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
    }

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(requestLogger)

morgan.token('personname', function (request) { return request.body.name })

morgan.token('personnumber', function (request) { return request.body.number })

app.use(morgan(function (tokens, req, res) {
    return [      
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        '{"name": "', tokens['personname'](req), '",',
        '"number": "', tokens['personnumber'](req), '"}'
        ].join(' ')
    }))

app.post('/api/persons',(request, response, next) => {
    const body = request.body    

    if (body.name === undefined)
    {
        return response.status(404).json({error: 'person name missing'})
    }
    
    if (body.number === undefined)
    {
        return response.status(404).json({error: 'person number missing'})
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
        date: new Date()
    })
        
    person.save()
    .then(savedPerson => {    
        response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/persons',(request,response) => {
    Person.find({}).then(person => {
        response.json(person)
    })    
})

app.get('/api/info',(request,response) => {

    Person.countDocuments( {}, function(err, result)
        {
            if(err){
                response.send(err)
            }
            else
            {            
                response.json('Phonebook has info for ' +  result + ' people at ' + new Date())            
            }
    })
})

app.get('/api/persons/:id',(request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person)
            {
                response.json(person.toJSON())
            }
            else
            {
                response.status(404).end()
            }            
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id',(request, response, next) => {
    Person.findOneAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,        
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.error(error.name)

    if (error.name === 'CastError' && error.kind === 'ObjectId')
    {
        return response.status(400).send( { error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    
    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})