const mongoose = require('mongoose');

module.exports = async () => {

  try {
    const connect = await mongoose.connect(process.env.DB_URL,
      {
        dbName:'ECommerce',
        useNewUrlParser: true, useUnifiedTopology: true
      }
    )
    console.log(`mongoDB connected :${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}