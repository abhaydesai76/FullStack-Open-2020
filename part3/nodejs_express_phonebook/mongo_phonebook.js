const mongoose = require('mongoose')

if (process.argv.length < 3)
{
    console.log('Looks like you missed to type password ...')
    process.exit()
}

const password = process.argv[2]
// console.log({password})

const url = `mongodb+srv://fullstack:${password}@fullstack2020-qltr6.mongodb.net/phonebook-app?retryWrites=true`
// console.log({url})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

const Person = mongoose.model('Person', personSchema)

if ((process.argv[3] === undefined) && (process.argv[4] === undefined))
{
    console.log('Only Password is Provided, Show Person Records')
    console.log('phonebook:')

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })    
}
else
{
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        date: new Date()
    })

    person.save().then(response => {
        const responsePerson = response
        
        console.log('Added ' + responsePerson.name + ' ' + responsePerson.number + ' to phonebook')
        mongoose.connection.close()
    })
}