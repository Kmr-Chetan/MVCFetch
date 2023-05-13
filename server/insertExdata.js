const mongoose = require("mongoose");

const useSchema = new  mongoose.Schema({
    list: Object,
    fileName: String
})
 const User= mongoose.model('exData', useSchema);


module.exports= User;

