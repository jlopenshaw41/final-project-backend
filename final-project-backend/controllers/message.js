import Subscriber, { findOne } from '../models/subscriber';
import messageSender from '../lib/messageSender';
import { default as app } from '../webapp';
import { response } from 'express';

export function webhook(req, res) {
  const phone = req.body.From;
  findOne(
    {
      phone: phone,
    },
    (err, sub) => {
      if (err) return respond('Error! Please text back again later');
      if (!sub) {
        const newSubscriber = new Subscriber({
          phone: phone,
        });
        newSubscriber.save((err, newSub) => {
          if (err || !newSub)
            return respond("We couldn't sign you up, please try again");
          respond(
            'Thanks for contacting us! Text "subscribe" to ' +
              'receive updates via text message'
          );
        });
      } else {
        processMessage(sub);
      }
    }
  );
  const processMessage = (subscriber) => {
    let msg = req.body.Body || '';
    msg = msg.toLowerCase().trim();
    if (msg === 'subscribe' || msg === 'unsubscribe') {
      subscriber.subscribed = msg === 'subscribe';
      subscriber.save((err) => {
        if (err)
          return respond('We could not subscribe you - please try ' + 'again.');
        let responseMessage = 'You are now subscribed for updates!';
        if (!subscriber.subscribed)
          responseMessage =
            'You have unsubscribed. Text "subscribe"' +
            ' to start receiving updates again';
        respond(responseMessage);
      });
    } else {
      const responseMessage =
        "Sorry, we didn't understand that. " +
        'Available commands are: Subscribe or Unsubscribe';
      respond(responseMessage);
    }
  };
  const respond = (message) => {
    res.type('text/xml');
    res.render('twiml', {
      message: message,
    });
  };
}

exports.sendMessages = (req, res) => {
  const message = req.body.message;
  const imageUrl = req.body.imageUrl;
  Subscriber.find({
    subscribed: true,
  })
    .then((subscribers) => {
      messageSender.sendMessageToSubscribers(subscribers, message, imageUrl);
    })
    .then(() => {
      req.flash('successes', 'messages on their way');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(`Err ${err.message}`);
      req.flash('errors', err.message);
      res.redirect('/');
    });
};
