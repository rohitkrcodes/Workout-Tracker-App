const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

require('dotenv').config();

// express app
const app = express()

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// workout routes
app.use('/api/workouts', workoutRoutes);

// user Routes
app.use('/api/user', userRoutes);

//errorHandler middleware
app.use(notFound);
app.use(errorHandler);


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    })
  })
  .catch((err) => {
    console.log(err);
  }) 