/* postlist-index.js */
var theme = require('../views/register');
var setup = require('../views/'+theme+'/setup');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

  var MongoClient = require('mongodb').MongoClient;
  var url = setup.dbUrl
 
  MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
   
    var query = { content: { $regex: req.body.query } };
    
    dbo.collection("posts").find(query).sort({date: -1}).limit(setup.postLimit).toArray(function(err, result) {
      if (err) throw err;
      req.postlist = result;
      db.close().then(getData());
    });
  });

  function getData(){
    res.render( theme+'/search', { postlist: req.postlist, title:setup.searchPageTitle });
  }


});

module.exports = router;