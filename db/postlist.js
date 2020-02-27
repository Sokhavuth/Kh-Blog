/* posts.js */
module.exports = function(req,res){

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://sokhavuth:sokhavuthmongodb@cluster0-ql8v2.gcp.mongodb.net/mydb?retryWrites=true&w=majority";
 
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
  
    dbo.collection("posts").find({}).sort({date:-1}).limit(12).toArray(function(err, result) {
      if (err) throw err;
      req.postlist = result;
      db.close().then(getData());
    });
  });

  function getData(){
    res.render('default/posts', { postlist: req.postlist, title:"​បណ្តុំការផ្សាយ" });
  }
}