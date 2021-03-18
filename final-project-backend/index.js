import { createServer } from 'http';
import { connect, Promise as _Promise } from 'mongoose';
import { mongoURL, port } from './config';

connect(mongoURL);

_Promise = Promise;

import app from './webapp';

const server = createServer(app);

server.listen(port, () => {
  console.log(`Express server listening on Port ${port}`);
});
