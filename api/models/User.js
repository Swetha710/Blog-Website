const mongoose=require('mongoose');
const {Schema,model} = mongoose;

mongoose.connect("mongodb+srv://vswetha020:SKVarfikhrVvVbxS@cluster0.i8v5bai.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB Connected")
}).catch(()=>{
    console.log("Failed")
})
const UserSchema = new Schema({
    username:{type: String, required:true, min:4, unique:true},
    password:{type:String,required:true}
});
const UserModel = model('User', UserSchema);

module.exports=UserModel;