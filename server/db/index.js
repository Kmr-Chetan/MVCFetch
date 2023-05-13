const mongoose = require("mongoose");
const uri =
  "mongodb+srv://id:pass@cluster0.vmdmj5v.mongodb.net/exData?retryWrites=true&w=majority";

//   id will note work  set id and pass
 function DB() {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connect");
    })
    .catch((err) => {
      console.log("error");
    });
//   const conn = mongoose.connection;
//   conn.on("connected", () => {
//     console.log("db is here");
//   });
}

module.exports = DB;
