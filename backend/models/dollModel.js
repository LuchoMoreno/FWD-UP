const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dollSchema = new Schema({

	type:{
		type: String, required:true
	},
	
	color:{ type: String, required:true
    },
    
	accessories:{ type: String, required:true
	},
	
	user: { type: Schema.Types.ObjectId,
		ref: 'users', // Referencia al modelo de usuario
		required: true
	}

}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});


const Doll = mongoose.model('dolls', dollSchema);
module.exports = Doll;