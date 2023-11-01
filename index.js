//load express
const express = require('express');
//load mysql2
const mysql = require('mysql2');
//load cors
const cors = require('cors');
//load environment variables
require('dotenv').config();
//criar conexão com o banco de dados
const connection = require('./src/database/db');
//create express app
const app = express();
//database init
function mysqlConnect() {
    global.connection = mysql.createConnection(connection);

    global.connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(mysqlConnect, 2000);
        }
    });
    global.connection.on('error', function (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            mysqlConnect();
        } else {
            throw err;
        }
    });
}

mysqlConnect();

//routes
const userRoutes = require('./src/routes/router');

//set up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//router
app.use('/api', userRoutes);


//listen to port
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});