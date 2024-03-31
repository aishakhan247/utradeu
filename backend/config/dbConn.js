const mongoose = require('mongoose')

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB CONNECTED"))
        .catch((error) => console.log(`DB Connection Error ${error}`));
}

module.exports = connectDB