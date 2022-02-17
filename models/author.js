const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

AuthorSchema.virtual('name').get(function(){
    var output_string = "";
    if(this.first_name)output_string+=this.first_name;
    output_string += " ,"
    if(this.family_name)output_string+=this.family_name;
    return output_string;
});


AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('life_span')
.get(function(){
    var output_string="";
    if (this.date_of_birth){
        output_string += DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    output_string += " - ";
    if (this.date_of_death){
        output_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    return output_string;
});
module.exports = mongoose.model('Author', AuthorSchema);