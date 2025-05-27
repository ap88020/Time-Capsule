import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name : {
        type : String,
        required : true,
        minlength : 3 ,
        maxlength : 50,
    },
    profileUrl : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 3,
    },
},
{
    timestamps : true
})

const User = mongoose.model("User",userSchema);

export default User;