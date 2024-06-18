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

  const doll = new Doll({ type: type, color: color, accessories: accessories, user: userId });

  let dollGuardado = await doll.save();

  // Edito la instancia de usuario para agregarle el muñeco
  await Usr.findByIdAndUpdate(userId, { $push: { dolls: dollGuardado._id } });


  // Actualizar o crear el ranking para este tipo de muñeco
  let ranking = await Ranking.findOne({ dollType: type });
  if (ranking) {
    ranking.chosenCount += 1;
  }

  else {
    ranking = new Ranking({
      dollType: type, chosenCount: 1
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

    // Guardar el tipo del muñeco antes de eliminarlo
    let type = doll.type;

    // Eliminar el muñeco
    await Doll.findByIdAndDelete(id);

    // Directamente elimino todos juntos de las referencias de dolls que existan en usuarios.
    await Usr.updateMany({ dolls: id }, { $pull: { dolls: id } });


    // Decrementar el ranking para este tipo de muñeco
    let ranking = await Ranking.findOne({ dollType: type });

    if (ranking) {
      ranking.chosenCount -= 1;
      await ranking.save();
    } else {
      console.warn(`No se encontró el ranking para el tipo de muñeco: ${type}`);
    }

    return true;

  } catch (error) {
    console.error("Error al eliminar el muñeco:", error);
    return false;
  }
};


const contarDocumentos = async () => {

  const totalDolls = await Doll.countDocuments();

  return totalDolls;
}

module.exports = { getDoll, getAllDolls, addDoll, deleteDoll, contarDocumentos }