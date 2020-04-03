const mongoose = require('mongoose')

if ( process.argv.length < 3 )
{
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack2020-qltr6.mongodb.net/note-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
    content:String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note',noteSchema)

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })

const note = new Note({
    content: 'Hekoru is amazing',
    date: new Date(),
    important: true,
})

note.save().then(response => {
    console.log('Note Saved')
    mongoose.connection.close()
})