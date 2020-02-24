/* authors.js */
var records;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sokhavuth:sokhavuthmongodb@cluster0-ql8v2.gcp.mongodb.net/mydb?retryWrites=true&w=majority";
 
MongoClient.connect(url, {useUnifiedTopology:true}, function(err, db){
  if (err) throw err;
  var dbo = db.db("mydb");
  
  dbo.collection("writers").find({}).toArray(function(err, result) {
    if (err) throw err;
    records = result;
    db.close();
  });
});

exports.findById = function(id, cb) {
process.nextTick(function() {
  var idx = id - 1;
  if (records[idx]) {
    cb(null, records[idx]);
  } else {
    cb(new Error('User ' + id + ' does not exist'));
  }
});
}

exports.findByUsername = function(username, cb) {
process.nextTick(function() {
  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.username === username) {
      return cb(null, record);
    }
  }
  return cb(null, null);
});
}