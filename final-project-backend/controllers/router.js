import { showForm } from './pages';
import { webhook, sendMessages } from './message';
import app from '../webapp';

export default (app) => {
  app.post('/message', webhook);
  app.get('/', showForm);
  app.post('/message/send', sendMessages);
};
