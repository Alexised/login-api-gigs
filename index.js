const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const passport = require('passport')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json({ limit: '200000kb' }));
const whitelist = [process.env.FRONTEND_URL, 'http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
require('./utils/auth');
app.get('/', (req, res) => {
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta');
});
app.use(passport.initialize());
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
