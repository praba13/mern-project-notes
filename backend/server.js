const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 4000;

console.log(process.env.NODE_ENV);
connectDB();

app.use(logger);
//app.use(cors());
//my own Options
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // 3rd Party Middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/userRoutes'));

//404 pages
app.all('*', (req, res) => {
  //lores.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('DATABASE IS CONNECTED !');
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT} !`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    'mongoErrLog.log'
  );
});
