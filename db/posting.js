/* posts.js */
var theme = require('../views/register');
var setup = require('../views/'+theme+'/setup');

module.exports = function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  var url = setup.dbUrl;
 
  MongoClient.connect(url, {useUnifiedTopology:true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    if(req.body.postpage == "post"){
      var collection = "posts";
    }
    else{
      var collection = "pages";
    }

    var records = [
      {date:new Date(), type:req.body.postpage, author:req.user.displayName, title:req.body.title, content:req.body.content, category:req.body.category}
    ];
  

    dbo.collection(collection).insertMany(records, function(err, res){
      if (err) throw err;
      //db.close();

      dbo.collection(collection).find().sort({date: -1}).limit(12).toArray(function(err, result) {
        if (err) throw err;
        req.postlist = result;
        db.close().then(getData());
      });

    });
  });
  
  function getData(){
    if(req.body.postpage == "post"){
      var pageTitle = "​បណ្តុំការផ្សាយ";
      res.render(theme+"/posts", { postlist: req.postlist, title:pageTitle });
    }
    else{
      var pageTitle = "​បណ្តុំទំព័រ​ព័ត៌មាន";
      res.render("default/pages", { postlist: req.postlist, title:pageTitle });
    }
  }

};