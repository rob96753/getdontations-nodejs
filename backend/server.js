const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo database connection established successfully");
})


const donationRoute = require('./routes/donation');
const donorRoute = require('./routes/donor');
const generatorRoute = require('./routes/generator')

app.use('/donation', donationRoute);
app.use('/donor', donorRoute);
app.use('/generator', generatorRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});