import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';

const app = express();

// enable logger
app.use(morgan('combined'));

// enable all CORS requests
app.use(cors());

// parse requests of content-type "application/json"
app.use(bodyParser.json());

// parse requests of content-type "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: true }));

// setup routing
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
