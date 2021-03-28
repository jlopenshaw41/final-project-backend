require('dotenv-safe').config();

const cfg = {};

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.authToken = process.env.TWILIO_AUTH_TOKEN;

cfg.twilioNumber = process.env.TWILIO_NUMBER;

module.exports = cfg;
