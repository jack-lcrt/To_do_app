const mongoose = require('mongoose');
const schema = mongoose.Schema;

const noteSchema = new schema({
	title:{
		type: String,
		required:[true,'Write a title']
	},
	color:{
		type:String,
		required:[true,'Select a color']
	},
	description:{
		type: String 
	}
});

const Notes = mongoose.model('Notes', noteSchema);

module.exports = Notes;