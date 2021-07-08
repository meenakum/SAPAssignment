// import all the necessary packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// we are using port 3000
const port = 3000;

const app = express();

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

// middleware for cors to allow cross origin resource sharing
app.use(cors());

// use middleware to parse requests containing json payloads
app.use(express.json());



// Use middleware to set up routes
app.use('/api', require('./routes/task'))
app.use('/', (req, res) => { res.send('Try /task') })


// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
