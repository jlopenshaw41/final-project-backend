const { Subscriber } = require('../models');
const messageSender = require('../lib/messageSender');

exports.sendMessages = (req, res) => {
  const message = req.body.message;
  Subscriber.findAll({
    where: {
      subscribe: true,
    },
  })
    .then((subscribers) => {
      messageSender.sendMessageToSubscribers(subscribers, message);
    })
    .then(() => {
      res.status(200).send('Success! Your message(s) have been sent.');
    })
    .catch((err) => {
      console.log(`Err ${err.message}`);
      res.status(500).send(err.message);
    });
};
