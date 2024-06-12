const {connect} = require('mongoose');

const {DB_URI} = require("../utils/config");


const conectarBD = async() =>{ connect(DB_URI) };


conectarBD()
.then( result => {console.log("Conectado satisfactoriamente a la base de datos de FULLSTACK WEB DEVELOPMENT")})
.catch( error => console.log(error))
