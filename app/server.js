const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('../app/user.config');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("successfully contected to database");
}).catch(err => {
    console.log('could not connect to the database . Exiting now...', err);
    process.exit();
});

// app.get('/', (req, res) => {
//     let message = "welcome to my appliction " 
//     res.json({ "message": message });
// });

require('../app/routes/user.routes')(app)

app.listen(3000, () => {
    console.log("Server is listening on port3000");
});