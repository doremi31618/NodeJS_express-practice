const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var genreSchema = new Schema({
    name: {type: String, required: true, max: 100, min:3},
});

genreSchema
.virtual('url')
.get(()=>{
    return '/catalog/genre/' + this._id;
})

module.exports = mongoose.model('Genre', genreSchema);