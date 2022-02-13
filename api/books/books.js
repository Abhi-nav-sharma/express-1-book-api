const books= require('./books.json')
const express= require('express')
const router=  express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({request_time:req.requestTime,books})
})

router.get('/books/:id',(req,res)=>{
    const book = books[req.params.id-1]
    if(!book){
       res.status(400).send("Book not found")
    }
    res.status(200).json({request_time:req.requestTime,book})
})

router.post('/books',(req,res)=>{
    try{
        const {author,book_name,pages,published_year}= req.body
        const book={
            id:books.length+1,
            author,
            book_name,
            pages,
            published_year
        }
        books.push(book)
        res.status(200).json({request_time:req.requestTime,book})
    }
    catch(err){
        res.status(400).send(`invalid request: ${err.toString()}`)
    }
})

router.patch('/books/:id',(req,res)=>{
    try{
        const book = books[req.params.id-1]
        if(!book){
            res.status(400).send("Book not found")
        }
        else{
            const {author,published_year}= req.body
            books[req.params.id-1].author= author
            books[req.params.id-1].published_year= published_year
            res.status(200).json(books[req.params.id-1])
        }        
    }
    catch(err){
        res.status(400).send(`invalid request: ${err.toString()}`)
    }
})

router.delete('/books/:id',(req,res)=>{
    try{
        let book= books[req.params.id-1]
        if(book){
            let index= books.map((elem)=>{
                return elem.id
            }).indexOf(Number(req.params.id))
            books.splice(index,1)
            res.status(200).json({deleted:book})
        }
        else{
            res.status(400).send("Book not found")
        }
    }
    catch(err){
        res.status(400).send(`invalid request: ${err.toString()}`)
    }
})

module.exports=router