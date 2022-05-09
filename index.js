const express = require('express');
const path = require('path');
const exphbs=require('express-handlebars')
const logger = require('./Middlewre/Logger');

const app=express()
const PORT=process.env.PORT ||5000

// app.get('/',
// (req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

// initialize
// app.use(logger)
// express handlebars middle wares

app.engine('handlebars', exphbs.engine({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
// home page route
app.get('/',(req,res)=> res.render(('index'))
)
// body parser middleware function
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// make a static folder

app.use(express.static(
    path.join(__dirname,'public'))
    )

app.use('/api/members',require('./Routes/api/membersApi'))
app.listen(PORT,
    (req,res)=>{
        console.log(`server started on port:${PORT}`)
    })