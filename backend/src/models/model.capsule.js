import mongoose from "mongoose";

const Schema = mongoose.Schema;

const timeCapsuleSchema = new Schema ({
    tittle : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 100,
    },
    message : {
        type : String,
        required : true,
    },
    unlockDate : {
        type : Date,
        required : true,
    },
    isPublic : {
        type : Boolean,
        default : false
    },
    mediaUrl : {
        type : String,
    },
    mediaType : {
        type : String,
        enum : ["image","video","audio"],
        default : "image",
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
},{
    timestamps : true,
});