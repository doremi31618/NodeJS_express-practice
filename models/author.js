const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

AuthorSchema
.virtual('name')
.get(()=>{
    console.log(this.first_name);
    console.log(this.family_name);
    var output_string = "";
    if(this.first_name)output_string+=this.first_name;
    output_string += " ,"
    if(this.family_name)output_string+=this.family_name;
    return output_string;
});


AuthorSchema
.virtual('url')
.get(()=>{
    return '/catalog/auhor/' + this._id;
});

AuthorSchema
.virtual('life_span')
.get(()=>{
    var birth_date_formated = "";
    var death_date_formated = "";
    if (this.date_of_birth){
        birth_date_formated = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    if (this.date_of_death){
        death_date_formated = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    return this.birth_date_formated + " - " + this.death_date_formated;
});



module.exports = mongoose.model('Author', AuthorSchema);