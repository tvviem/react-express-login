// default index.js file
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.disable('x-power-by');

const port = 8080;

/** HTTP GET request */
app.get('/', (req, res) => {
  res.status(201).json('Home GET REQUEST');
});

/** API routes */
app.use('/api', router);

/** Start Server only when we have a valid connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log('Cannot connect to the server!');
    }
  })
  .catch((error) => {
    console.log(`Invalid db connection... MESS: ${error}`);
  });
