const whitelist = [process.env.API_URL, process.env.CLIENT_URL];

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