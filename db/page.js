/* post.js */
var theme = require('../views/register');
var setup = require('../views/'+theme+'/setup');

module.exports = function(req,res){
  var ObjectId = require('mongodb').ObjectID;
  var MongoClient = require('mongodb').MongoClient;
  var url = setup.dbUrl
 
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
  
    dbo.collection("pages").find({_id:ObjectId(req.params.id)}).sort({date:-1}).limit(setup.postLimit).toArray(function(err, result) {
      if (err) throw err;
      req.postlist = result;
      db.close().then(getData());
    });

  });

  function getData(){
    res.render(theme+'/page', { postlist: req.postlist, title:setup.singlePageTitle });
  }
}