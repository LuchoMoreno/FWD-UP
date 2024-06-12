const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
  
    dollType: {
    type: String,
    required: true,
    unique: true
  },
  
  chosenCount: {
    type: Number,
    required: true,
    default: 0
  }
  
});

const Ranking = mongoose.model('rankings', rankingSchema);
module.exports = Ranking;