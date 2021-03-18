require('dotenv-safe').load();

const cfg = {};

cfg.port = process.env.PORT || 3000;

cfg.secret = process.env.APP_SECRET || 'keyboard cat';

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.authToken = process.env.TWILIO_AUTH_TOKEN;

cfg.twilioNumber = process.env.TWILIO_NUMBER;

cfg.mongoUrl =
  process.env.MONGOLAB_URI ||
  process.env.MONGO_URL ||
  'mongodb://localhost:27017';

cfg.mongoUrlTest = 'mongodb://localhost:8000';

module.exports = cfg;
