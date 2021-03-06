/* postlist-index.js */
var theme = require('../views/register');
var setup = require('../views/'+theme+'/setup');

module.exports = function(req,res){

  var MongoClient = require('mongodb').MongoClient;
  var url = setup.dbUrl
 
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
    
    dbo.collection("posts").find({}).sort({date: -1}).limit(setup.postLimit).toArray(function(err, result) {
      if (err) throw err;
      req.postlist = result;
      db.close().then(getData());
    });
  });

  function getData(){
    for(var i=0; i<req.postlist.length; i++){

    }
    res.render( theme+'/index', { postlist: req.postlist, title:setup.blogTitle });
  }
}