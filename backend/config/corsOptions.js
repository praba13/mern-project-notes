const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    // orgion Method
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); //(error Object, )
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
