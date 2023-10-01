const express = require('express');
const connectToMongo = require('./db');
connectToMongo(); // calling function.
const app = express();
const port = 4000;
const cors = require('cors')



app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));




app.listen(port, () =>{
    console.log(`iNoteBook Server is listening on port ${port}...`)
})