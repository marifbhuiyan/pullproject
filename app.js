const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const pollcontrolar = require('./pollcontrolar')


const app = express()

app.set('view engine','ejs')


app.use(morgan('dev'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/create',pollcontrolar.createpollGetcontrolar)
app.post('/create',pollcontrolar.createpollPostcontrolar)

app.get('/polls/:id',pollcontrolar.viewpollgetcontrolar)

app.post('/polls/:id',pollcontrolar.viewpollpostcontrolar)

app.get('/polls',pollcontrolar.getpolls)

app.get('/',(req,res)=>{
    res.render('home')
})



mongoose.connect('mongodb://127.0.0.1:27017/pollcreation')
    .then(()=>{
        app.listen(4545,()=>{
            console.log('applecation is ready to serve on port 4545')
        })
    })
    .catch((e)=>{
        console.log(e)
    })