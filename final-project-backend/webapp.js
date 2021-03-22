import express from 'express';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import { secret as _secret } from './config';
import {} from './controllers/subscriberControllers';
import message from './controllers/message';

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: _secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.post('/add-subscriber', subscriberControllers.create);
app.post('/subscribers/send-message', message.sendMessages);

app.get('/subscribers', subscriberControllers.list);

app.patch('/subscribers/:id', subscriberControllers.update);

app.delete('/subscribers/:id', subscriberControllers.deleteSubscriber);

export default app;
