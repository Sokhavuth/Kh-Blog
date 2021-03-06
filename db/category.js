/* category.js */
var theme = require('../views/register');
var setup = require('../views/'+theme+'/setup');

module.exports = function(req,res,next){

  var MongoClient = require('mongodb').MongoClient;
  var url = setup.dbUrl
 
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
  console.log(req.body);
    dbo.collection("posts").find({category:req.params.cat}).sort({date:-1}).limit(setup.postLimit).toArray(function(err, result) {
      if (err) throw err;
      req.postlist = result;
      db.close().then(getData());
    });
  });

  function getData(){
    res.render( theme+'/category', { postlist: req.postlist, title:setup.categoryTitle + req.params.cat });
  }
};
