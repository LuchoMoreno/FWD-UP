require('mongoose');

const Doll = require('../models/dollModel');

const UsrController = require('../controllers/userController');


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


 /*const deleteDoll = async(dollId) => {

    const result = await Doll.findByIdAndDelete(id);

    // FALTA ENCONTRAR LA REFERENCIA Y TAMBIEN BORRARLA EN USER.

    return result;
}*/

const deleteDoll = async (userId, dollId) => {
    try {
      
        // Buscar el muñeco por su ID
      const doll = await Doll.findById(dollId);
      
      if (!doll) {
        return false; // Si el muñeco no existe, retornar false
      }
      
      // Eliminar el muñeco
      await Doll.findByIdAndDelete(dollId);
      
      // Eliminar la referencia del muñeco del usuario
      await UsrController.removeDollReference(userId, dollId);
      
      return true;

    } catch (error) {
      console.error("Error al eliminar el muñeco:", error);
      return false;
    }
  };

 module.exports = { addDoll, getAllDolls, deleteDoll}