const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: Date,
    date_of_death: Date,
});

AuthorSchema
.virtual('name')
.get(()=>{
    return this.family_name + ", " + this.last_name;
});


AuthorSchema
.virtual('url')
.get(()=>{
    return '/catalog/auhor/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);