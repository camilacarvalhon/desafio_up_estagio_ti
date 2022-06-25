const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    nome: {
        type:String,
        required:true
    },
    autor:{
        type:String,
        required:true
    },
    data:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User', userSchema);