const mongoose = require('mongoose');
const error = require('./middleware/error');  
 
// // Define the schema for the Users collection
// const userSchema = new mongoose.Schema({
//   name: String, // Change 'name' to a type, and you can set a default value if needed
// });

// // Create the Users model
// const Users = mongoose.model('Users', userSchema);

const connectDatabase = async () => {

  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increase this value
    socketTimeoutMS: 45000,
  })
    .then(() => { 
      console.log(`MongoDB connected with server: ${mongoose.connection.host}`.yellow);
    })
  // .catch((error) => {
  //   console.log('Error In Connecting database With Sever', error)
  // })

}




module.exports = {
  connectDatabase,
  // Users, // Export the Users model for use in other parts of your application
};
