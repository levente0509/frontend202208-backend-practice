const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})

app.use('/public', express.static(`${__dirname}/../frontend/public`))

app.get('/beers', (req, res) => {
  fs.readFile(`${__dirname}/data/data.json`, (err, data) => {
    if (err) {
      console.log('hiba:', err)
      res.status(500).send('hibavan')
    } else {
      res.status(200).send(JSON.parse(data))
    }
  })
})

app.listen(2022, console.log('server listening on http://127.0.0.1:2022'))