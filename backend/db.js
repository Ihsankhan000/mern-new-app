const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/inotebook';
const dbOptions = {
    useNewUrlParser: true ,
    useUnifiedTopology: true
}

const connectToMongo = () =>{
    mongoose.connect(mongooseURI, dbOptions)
    .then(()=> {
        console.log("successfully connected to Mongo DB...")
    }).catch((error) => {
        console.log("no connection"+error)
    })
}


module.exports = connectToMongo;



