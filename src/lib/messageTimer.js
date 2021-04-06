const axios = require('axios');

let timePreviousMessageSent = new Date();

const getDifferenceInHours = (date2, date1) => {
  let diff = (date2.getTime() - date1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

const currentHour = new Date().getHours();

const energyMessage = () => {
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
        return console.log(
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
};

module.exports = energyMessage;
