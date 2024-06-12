require('mongoose');
const Ranking = require('../models/rankingModel');


const getTopDolls = async () => {
    // Obtener los tres muñecos más elegidos
    const topDolls = await Ranking.find({})
      .sort({ chosenCount: -1 })
      .limit(3)  
    return topDolls;
  };


  module.exports = {getTopDolls}


