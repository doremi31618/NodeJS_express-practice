const mongoose = require('mongoose');
const { ENUM } = require('mysql/lib/protocol/constants/types');
const Schema = mongoose.Schema;

var bookinstanceSchema = new Schema({
    book: [{type: Schema.Types.ObjectId, ref: 'Book'}],
    imprint: String,
    status: {enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: Date,
    url: String
});