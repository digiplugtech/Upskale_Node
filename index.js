const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config');

module.exports =  {
    config
};

// Database connection
const db = require('./db');
// Connection Database.
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//Specific Routes....
const userRouter = require('./routes/user.routes');

const programRouter = require('./routes/program.routes');
const courseRouter = require('./routes/course.routes');
const instructorRouter = require('./routes/instructor.routes');
const faqRouter = require('./routes/faq.routes');
const orderRouter = require('./routes/order.routes')
const newsletterRouter = require('./routes/newsletter.routes');

const app = express()
const apiPort = 5000;

var corsOptions = {
    origin: "http://localhost:3000"
  };

app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
//console.log(path.resolve(__dirname, 'build'));
app.use(express.static(path.join(__dirname, 'build')));
app.get("/", (req, res) =>{
    //res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    res.sendFile(__dirname+'/build/index.html/#');
})

/*
app.get(config.serversubpath, (req, res) => {
    res.send('Hello World!')
})*/
/*
app.get('/api/v1', (req, res) => {
    res.send('Hello World!')
})
*/

//const serverpath = config.serverpath+config.serversubpath;
//const serverpath = config.serversubpath;
//console.log(config.serversubpath)
app.use(config.serversubpath, userRouter); // Getting user Router.
app.use(config.serversubpath, programRouter); // Getting program Router.
app.use(config.serversubpath, courseRouter); // Getting course Router.
app.use(config.serversubpath, instructorRouter); // Getting instructor Router.
app.use(config.serversubpath, faqRouter); // Getting faq Router.
app.use(config.serversubpath, orderRouter); // Getting/Storing Order and payment information.

app.use(config.serversubpath, newsletterRouter); // Getting/Storing newsletter information.

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

