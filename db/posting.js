/* posts.js */

module.exports = function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://sokhavuth:sokhavuthmongodb@cluster0-ql8v2.gcp.mongodb.net/mydb?retryWrites=true&w=majority";
 
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    var records = [
      {date:new Date(), author:req.user.displayName, title:req.body.title, content:req.body.content, category:req.body.category}
    ];
  
    dbo.collection("posts").insertMany(records, function(err, res){
      if (err) throw err;
      //db.close();

      dbo.collection("posts").find().sort({date: -1}).limit(12).toArray(function(err, result) {
        if (err) throw err;
        req.postlist = result;
        db.close().then(getData());
      });

    });
  });
  
  function getData(){
    res.render('posts', { postlist: req.postlist, title:"​បណ្តុំការផ្សាយ" });
  }

}





