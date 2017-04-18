'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	polls: {
		author: String,
		name: String,
		options: []
	},
	votes: [
		{
			name: String,
			count: Number,
			electorate: []
		}
	]
});

module.exports = mongoose.model('Poll', Poll);