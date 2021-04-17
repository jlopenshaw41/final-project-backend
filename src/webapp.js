const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const subscriberControllers = require('./controllers/subscriberControllers');
const message = require('./controllers/message');
const cron = require('node-cron');
const app = express();
const energyMessage = require('./lib/messageTimer');

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));

cron.schedule('* * * * *', () => {
  return energyMessage();
});

app.post('/add-subscriber', subscriberControllers.create);

app.post('/subscribers/send-message', message.sendMessages);

app.get('/', (req, res) => {
  res.status(200).send("Success!");
})

app.get('/subscribers', subscriberControllers.list);

app.patch('/subscribers/:id', subscriberControllers.update);

app.delete('/subscribers/:id', subscriberControllers.deleteSubscriber);

module.exports = app;
