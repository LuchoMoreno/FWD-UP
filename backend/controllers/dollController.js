require('mongoose');

const Doll = require('../models/dollModel');
const Usr = require('../models/userModel');
const Ranking = require('../models/rankingModel');



const getDoll = async (id) => {

  const doll = await Doll.findById(id);

  return doll;
}


const getAllDolls = async (limit, offset) => {

  const dolls = await Doll.find({}).limit(limit).skip(offset).populate('user', 'name email');

  return dolls;
}


const addDoll = async (userId, type, color, accessories) => {

  let existUser = await Usr.findById(userId);

  if (!existUser) {
    return false; // Si el usuario no existe, retornar false
  }
  
  const doll = new Doll({ type: type, color: color, accessories: accessories, user: userId});

  let dollGuardado = await doll.save();
  
  // Edito la instancia de usuario para agregarle el muñeco
  await Usr.findByIdAndUpdate(userId, { $push: { dolls: dollGuardado._id } });


  // Actualizar o crear el ranking para este tipo de muñeco
  let ranking = await Ranking.findOne({ dollType: type });
  if (ranking) {
    ranking.chosenCount += 1;
  } 
  
  else {
    ranking = new Ranking({dollType: type, chosenCount: 1
    });
  }

  await ranking.save();

  return { dollGuardado };
}


const deleteDoll = async (id) => {
  try {

    // Buscar el muñeco por su ID
    const doll = await Doll.findById(id);

    if (!doll) {
      return false; // Si el muñeco no existe, retornar false
    }

    // Eliminar el muñeco
    await Doll.findByIdAndDelete(id);

    // Actualizar el usuario para eliminar la referencia del muñeco
    //await Usr.findByIdAndUpdate(userId, { $pull: { dolls: dollId } });

    // Directamente elimino todos juntos de las referencias de dolls que existan en usuarios.
    await Usr.updateMany({ dolls: id }, { $pull: { dolls: id } });

    return true;

  } catch (error) {
    console.error("Error al eliminar el muñeco:", error);
    return false;
  }
};

module.exports = {getDoll, getAllDolls, addDoll, deleteDoll }