/* postlist.js */
var theme = require('../views/register');
var setup = require('../views/'+theme+'/setup');

module.exports = function(req,res){

  var MongoClient = require('mongodb').MongoClient;
  var url = setup.dbUrl
 
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
  
    dbo.collection("pages").find({}).sort({date:-1}).limit(12).toArray(function(err, result) {
      if (err) throw err;
      req.postlist = result;
      db.close().then(getData());
    });
  });

  function getData(){
    res.render('default/pages', { postlist: req.postlist, title:"​បណ្តុំទំព័រ​ព័ត៌មាន" });
  }
}