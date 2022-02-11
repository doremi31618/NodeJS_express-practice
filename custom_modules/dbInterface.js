var mongoose = require('mongoose');

//connecting to ser ver 
var mongoDB_url = 'mongodb://localhost:27017/express-practice'
mongoose.connect(mongoDB_url);
mongoose.Promise = global.Promise;

//mongo db connect event 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', ()=>{
    console.log("connect success");
})

//declare schema 
const Schema = mongoose.Schema;
var authorSchema = new Schema({
    name: String,
    stories: [{type: Schema.Types.ObjectId, ref:'Story'}]
});

var storySchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    title: String
});

var Story = mongoose.model('Story', storySchema);
var Author = mongoose.model('Author', authorSchema);

//Insert Data : C
var bob = new Author({name: 'Bob Smith'});
bob.save((err)=>{
    if (err)return handleError(err);
    var story = new Story({
        title: "Bob goes sledding",
        author: bob._id
    });
    console.log("save author success");
    story.save((err)=>{
        if (err) return handleError(err);
        console.log("save story success");
    });
});

//Read Data : R
//find one
Story
.findOne({title: "Bob goes sledding"})
.populate('author')
.exec((err, story)=>{
    if (err) return handleError(err);
    console.log('The author is %s' , story.author.name);
});

//find many
Story
.find({author: bob._id})
.exec((err, stories)=>{
    if (err) return handleError(err);
    console.log('The author is %s' , story.author.name);
});
