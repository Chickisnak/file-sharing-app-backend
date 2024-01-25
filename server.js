const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
const path = require('path')
const cors = require('cors')
connectDB();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use('/api/files', require('./routes/files'))
app.use('/files/shareBackendFiles', require('./routes/show'))


app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
})

