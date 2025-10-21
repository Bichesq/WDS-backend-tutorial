// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
// }

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Mongoose is connected"))
.catch(err => console.log("Connection error", err))

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to mongoose'))


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout.ejs');
app.use(expressLayouts);
app.use(express.static('public'));



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log("server running on port: 3000")
})