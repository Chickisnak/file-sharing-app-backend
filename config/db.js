const mongoose = require('mongoose');
require('dotenv').config();

function connectDB(){
  mongoose
    .connect(process.env.DB_URL)
  .then(()=>{
    console.log(`Database successfully connected`);
  })
  .catch(e=>console.log(`Failed to connect the Database ${e}`))
}

module.exports = connectDB;
