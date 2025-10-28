
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    // useUnifiedTopology: true
    })
    .then(() => console.log("Mongoose is connected"))
    .catch(err => console.log("Connection error", err))

    const db = mongoose.connection;
    db.on('error', error => console.error(error));
    db.once('open', () => console.log('Connected to mongoose'))


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log("server running on port: 3000")
})