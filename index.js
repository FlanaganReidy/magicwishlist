const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Hello,it's me the app and I'm listening at http://localhost:${port}`)
})