const connectToMongo=require('./db');
const cors=require('cors');


const express = require('express')

const app = express()
const port = 5000
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/home', (req, res) => {
    res.send('Hello home!')
  })
 app.use('/auth',require('./routes/emp1'));
 app.use('/auth',require('./routes/notes1'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
