const mongoose = require("mongoose");

async function connect() {
    try {  
    await mongoose.connect(
        "mongodb+srv://dwUser:rJLyF52MVmGtY2JO@cluster0-rzwew.mongodb.net/test?retryWrites=true&w=majority",
        {useNewUrlParser: true}
    );
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = { connect };
