
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: [{type: Schema.Types.ObjectId, ref: 'Author'}],
    summary: String,
    ISBN: String,
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    url: String
});