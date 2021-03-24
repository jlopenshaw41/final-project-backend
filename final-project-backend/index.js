const app = require('./src/webapp');

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Express server listening on Port ${PORT}`);
});
