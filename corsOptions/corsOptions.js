const whitelist = ['http://127.0.0.1:5000', 'https://brshoes.pp.ua'];

module.exports = corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the whitelist or if it's a same-origin request
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};