const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 4000;

app.use(logger);
//app.use(cors());
//my own Options
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // 3rd Party Middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));

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

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
