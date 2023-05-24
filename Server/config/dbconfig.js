const mongoose = require('mongoose');
// const url = "mongodb+srv://sdTrigyn:1435051051@cluster0.2jc00.mongodb.net/QuizDB?retryWrites=true&w=majority";
const url = "mongodb+srv://heliwareWeb:1435051051@cluster0.jt01oeq.mongodb.net/WebAPP?retryWrites=true&w=majority";
module.exports = (async()=>{
    try {
      // Connect to the MongoDB cluster
       await mongoose.connect(
          url,
        {  useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" DB is connected")
      );
  
    } catch (e) {
      console.log("could not connect");
      console.log("Error in DB connection !" + JSON.stringify(e, undefined,2));
    }
    
  })