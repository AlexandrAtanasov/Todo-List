const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const todoRoutes = require('./routes/todos')


const PORT = process.env.PORT || 3000

const app = express()
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'handlebars'
})
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
  try {
      await mongoose.connect('mongodb+srv://alex:alex123@cluster0-04d1w.mongodb.net/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()

