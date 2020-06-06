require('dotenv').config()
const express = require('express')
const app = express()

const v1 = require('./routes/v1')

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//passport
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// cors 
const cors = require('cors')
app.use(cors())

// morgan
const logger = require('morgan')
app.use(logger('dev'))

// DB connection 
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//ROUTES
app.use('/api/v1',v1)

//ERROR HANDLER 
app.use((req,res,next)=>{
    /* res.status(404).send('Page not Found') */
    var err = new Error('Page not Found')
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
  const status = err.status  || 500
  const error  = err.message || 'error processing your request'
  res.status(status).send({error})
})

port = process.env.PORT || 5000 

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})