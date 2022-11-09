const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado a db");
} catch (error) {
  console.log(error);
}
