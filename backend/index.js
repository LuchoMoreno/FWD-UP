// PARA EJECUTAR: 
// - node index.js


require('./db/mongo');

const {PORT} = require('./utils/config');

const express = require('express');

const app = express();

app.use(express.json());

const http = require('http').createServer(app);


// npm install dotenv
//require('dotenv').config();





app.listen(PORT, ()=> {
    console.log(`Server corriendo en puerto ${PORT}`);
});
