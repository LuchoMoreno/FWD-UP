const jwt = require('jsonwebtoken');

const {SECRET} = require('../utils/config');

const verify = (req,res,next) =>{

    try {
        /*const decode =  jwt.verify(req.headers.Authorization, SECRET);
        next();*/

        const token = req.headers.authorization.split(' ')[1]; // Obtener el token Bearer
        
        const decoded = jwt.verify(token, SECRET);
        
        next();

    }catch(error){
        res.status(401).send("No autorizado");
    }     
}

module.exports = {verify}