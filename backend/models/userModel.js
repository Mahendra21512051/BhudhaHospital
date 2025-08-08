import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true,},

    // image:{type:String},
     address:{type:String, default:{line1: '', line2: ''}},
     gender:{type:String, default:"Not Selected"},
     dob:{type:String, default:"Not Selected"},
     phone:{type:String, default:'000000000'}
    
})

//const userModel  = mongoose.models.user  ||  mongoose.model('user', userSchema)
const userModel = mongoose.model('User', userSchema);


export default userModel