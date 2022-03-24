const express = require('express')
const app = express()
const db = require('./db')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

const routes = require('./routes/routes')
app.use(routes)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log('Server on http://localhost:'+PORT)
})