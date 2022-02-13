const express= require('express')
const app= express()
const cors= require('cors')
const booksRouter= require('./api/books/books')
const logger= require('./api/middleware/logger')
app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/',booksRouter)

app.listen(1234, ()=>{
    console.log('Listening on port 1234')
})

