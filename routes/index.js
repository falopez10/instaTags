var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = express.Router();
const fetch = require("node-fetch");
//ZONA INSTAGRAM----------------------------------------------------
const urlBase = "https://www.instagram.com/explore/tags/";
const urlEnd = "?__a=1";

//acceso a instagram
router.get("/:query", function(req, res) {
  let tagQuery = req.params.query;

  fetch(urlBase + tagQuery + urlEnd)
  .then(response => {
    response.json()
    .then(json => {
        // console.log("recibido: " + JSON.stringify(json));
        
        res.json(Top10Tags(listarTags(json)));
      });
  })
  .catch(error => {
    console.log(error);
  });
  console.log()
});

//listado de tags
const listarTags = function(_json){
  let listTexts = _json.graphql.hashtag.edge_hashtag_to_top_posts.edges;
  // console.log(graphql.hashtag.edge_hashtag_to_top_posts.edges[0].node.edge_media_to_caption.edges[0].node.text);
  listTexts = listTexts.map((e)=>{
    //trae texto de cada tag...
    return e.node.edge_media_to_caption.edges[0].node.text 
  });
  let listTags = [];
  for (let ind = 0; ind<listTexts.length; ++ind)
  {
    text = listTexts[ind];
    for(let w of text.split(" "))
    {
      if (w.startsWith("#")){

        listTags.push(w);
      }
    }
  }
  


  return listTags;

}
//retorno de 10 tags
const Top10Tags = function(listTags){
  let listUniqueObjs = [];
  let listUniqueTags = [];
  for(let i=0; i<listTags.length;++i)
  {
    let tagActual = listTags[i];
    if(listUniqueTags.includes(tagActual))
    {
      let uniqueObj = listUniqueObjs.find(tagActual);
      uniqueTag.count = uniqueTag.count+1;
    }
    else{
      let obj = {"tag":tagActual, "count":1};
      listUniqueTags.push(tagActual);
      listUniqueObjs.push(obj);
      console.log("pusheado: " + JSON.stringify(obj));

    }
  }
  console.log(listUniqueObjs);
  return listUniqueObjs;

}

//--------------------------------------------------------------------


// Connection URL
const url = "mongodb://localhost:27017";


const findDocuments = function(db, query, callback) {
  // Get the documents collection
  const collection = db.collection("followers");
  // Find some documents
  collection.find(query).limit(20).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found " + docs.length + " records");
    // console.log(docs);
    callback(docs);
  });
};

function getFollowers(query, callback) {

  // Database Name
  const dbName = "twitter_followers";

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, query, callback);

    client.close();
  });

}

/* GET home page. */
// router.get("/:query", function(req, res) {
//   console.log("req params "+req.params);
//   getFollowers(
//     {"user.screen_name":req.params.query}, 
//     (followers) => res.send(followers) 
//     );
// });

module.exports = router;
