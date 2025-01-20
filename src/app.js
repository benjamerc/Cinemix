const express = require('express')
const path = require('node:path')
const cors = require('cors')

const app = express()

const movies = require('../movies.json')

app.disable('x-powered-by')

app.use(cors({ origin: '*' }))

// Motor de plantillas
app.set('views', path.join(__dirname, 'src', 'views'));
app.set("view engine", "ejs")

app.use('/public', express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/movies', (req, res) => {
  const { subjectArea } = req.query
  let filteredMovies = movies

  if (subjectArea) {
    filteredMovies = movies.filter(
      movie => movie.subjectArea.some(sA => sA.toLowerCase() === subjectArea.toLowerCase())
    )
  }

  filteredMovies = filteredMovies.sort(() => Math.random() - Math.random())

  res.render('movies', { filteredMovies, subjectArea })
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === Number(id))
  if (movie) {
    return res.render('movie', { movie })
  } else {
    res.status(404).render('404')
  }
})

app.use((req, res, send) => {
  res.status(404).render('404')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
