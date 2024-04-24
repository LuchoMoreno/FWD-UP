require('mongoose');

const Doll = require('../models/doll');

const UsrController = require('../controllers/user');


const addDoll = async (userId, type, color, accessories) => {

         const doll = new Doll({type: type, color:color, accessories: accessories});

         
         let dollGuardado = await doll.save(); 
         
         
         console.log("Doll guardado");

        
         // Agregar la referencia del muñeco al usuario
         await UsrController.editDolls(userId, doll._id);

         return { dollGuardado }; 
 }   
 

 const getAllDolls = async (limit,offset) => {
 
     const dolls = await Doll.find({}).limit(limit).skip(offset);
 
     return dolls;
 }


 const deleteDoll = async(id) => {

    const result = await Doll.findByIdAndDelete(id);

    // FALTA ENCONTRAR LA REFERENCIA Y TAMBIEN BORRARLA EN USER.

    return result;
}

 module.exports = { addDoll, getAllDolls, deleteDoll}