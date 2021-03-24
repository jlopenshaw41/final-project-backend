const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const subscriberControllers = require('./controllers/subscriberControllers');
const message = require('./controllers/message');
const cron = require('node-cron');
const app = express();

const axios = require('axios');

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));

//Cron functionality//
let timePreviousMessageSent = new Date();
const getDifferenceInHours = (date2, date1) => {
  let diff = (date2.getTime() - date1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

cron.schedule('*/30 * * * *', () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 8 && currentHour <= 21) {
    axios.get('https://api.reactive.energy/energy-mix').then((res) => {
      const energyMix = res.data;
      const currentGreenEnergyProportion =
        energyMix.wind.proportion +
        energyMix.solar.proportion +
        energyMix.biomass.proportion +
        energyMix.hydro.proportion +
        energyMix.nuclear.proportion;
      if (currentGreenEnergyProportion > 0.5) {
        const currentTime = new Date();
        const timeElapsedSincePreviousMessage = getDifferenceInHours(
          currentTime,
          timePreviousMessageSent
        );
        console.log(timeElapsedSincePreviousMessage);
        if (timeElapsedSincePreviousMessage > 10) {
          console.log(
            `Status: Current low carbon energy proportion is ${Math.floor(
              currentGreenEnergyProportion * 100
            )}%. Sending messages...`
          );
          timePreviousMessageSent = new Date();
        } else {
          return console.log(
            'Status: It has not been 10 hours since the previous message. No message sent.'
          );
        }
      } else {
        console.log(
          `Status: Current low carbon energy proportion is only ${Math.floor(
            currentGreenEnergyProportion * 100
          )}%. No message sent.`
        );
      }
    });
  } else {
    return console.log(
      'Status: Do not disturb is active. Only send messages between 08:00 and 21:00. No messages sent.'
    );
  }
});
//Cron functionality//

app.post('/add-subscriber', subscriberControllers.create);
app.post('/subscribers/send-message', message.sendMessages);

app.get('/subscribers', subscriberControllers.list);

app.patch('/subscribers/:id', subscriberControllers.update);

app.delete('/subscribers/:id', subscriberControllers.deleteSubscriber);

module.exports = app;
