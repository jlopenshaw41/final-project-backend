const app = require('./src/webapp');

const APP_PORT = process.env.PORT || 4000;

app.listen(APP_PORT, () => {
  console.log(`Express server listening on Port ${APP_PORT}`);
});
