// prod.js - unlike dev.js we commit this to git!!!
module.exports = {
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  google_api_key: process.env.GOOGLE_API_KEY
};
