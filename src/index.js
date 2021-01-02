const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const urlshortner = require('./routes/url');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');

const PORT = process.env.PORT || 7000;

dotenv.config({ path: './config/config.env'});
connectDB();
const app = express();


app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/', urlshortner);

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`server runnin on ${process.env.NODE_ENV} mode and app listening on ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
    console.log(`error ${err.message}`);
    server.close(() => process.exit(1));
});
