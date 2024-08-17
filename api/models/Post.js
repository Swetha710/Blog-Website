const mongoose = require('mongoose')
const {Schema, model} = mongoose

mongoose.connect("mongodb+srv://vswetha020:SKVarfikhrVvVbxS@cluster0.i8v5bai.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB Connected")
}).catch(()=>{
    console.log("Failed")
})
const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type:Schema.Types.ObjectId, ref:'User'}
},{
   timestamps: true 
})
const PostModel = model('Post', PostSchema)
module.exports = PostModel