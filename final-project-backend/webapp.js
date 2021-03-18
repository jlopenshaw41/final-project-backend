import { join } from 'path';
import express, { static } from 'express';
import { urlencoded } from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import morgan from 'morgan';
import { secret as _secret } from './config';

const app = express();

app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(static(join(__dirname, 'public')));
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
app.use(flash());

require('./controllers/router').default(app);

app.use((req, res, next) => {
  res.status(404);
  res.sendFile(join(__dirname, 'public', '404.html'));
});

app.use((err, req, res, next) => {
  console.error('An application error has occurred:');
  console.error(err);
  console.error(err.stack);
  res.status(500);
  res.sendFile(join(__dirname, 'public', '500.html'));
});

export default app;
