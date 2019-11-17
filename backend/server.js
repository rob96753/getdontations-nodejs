const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = config.get('mongoURI');

console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo database connection established successfully");
})

const donationRoute = require('./routes/donation');
const donorRoute = require('./routes/donor');
const generatorRoute = require('./routes/generator');
const usersRoute = require('./routes/api/users');
const loginRoute = require('./routes/api/login');

app.use('/donation', donationRoute);
app.use('/donor', donorRoute);
app.use('/generator', generatorRoute);
app.use('/api/users',usersRoute);
app.use('/api/login',loginRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});