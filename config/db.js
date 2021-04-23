const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const ConnectDB = async ()=>{
try {
    await mongoose.connect(db,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log(`MongoDB is working...`)
} catch (error) {
    console.log(error.message);
}
}

module.exports = ConnectDB;