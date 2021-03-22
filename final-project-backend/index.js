import { listen } from './webapp';

const PORT = 4000;

listen(PORT, () => {
  console.log(`Express server listening on Port ${PORT}`);
});
