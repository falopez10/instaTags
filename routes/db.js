"use strict";
const mongodb = require("mongodb").MongoClient;
const dbName = "heroku_7nk60ng3";
const url = process.env.MONGODB_URI||"mongodb://localhost:27017/"+dbName;

exports.upsertTag = function(_tag){
  mongodb.connect(url, function(err, dbm) {
    if (err) {
      console.log("err");
      throw err;
    };

    const mydb = dbm.db(dbName);
    const myquery = { tag: _tag};
    const update = { tag: _tag, date: new Date()};

    mydb.collection("tags").update(
      //Que encuentre este tag
      myquery, 
      //que actualice el tag (o inserte uno nuevo)
      update,
      //se activa update/insert
      {upsert: true});


    dbm.close();


  });
}

exports.findSearchedTags = function(callback) {
  mongodb.connect(url, function(err, dbm) {
    if (err) {
      console.log("err");
      throw err;
    };
    // Get the documents collection
    const collection = dbm.db(dbName).collection("tags");
    // Find some documents
    collection.find().sort({date:-1}).limit(10).toArray(function(err, docs) {
      console.log("Found " + docs.length + " records");

      callback(docs);
      dbm.close();

    });
  });
}


