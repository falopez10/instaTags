var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = express.Router();
const fetch = require("node-fetch");
//ZONA INSTAGRAM----------------------------------------------------
const urlBase = "https://www.instagram.com/explore/tags/";
const urlEnd = "?__a=1";

//acceso a instagram
router.get("/:queryTag", function(req, res) {
  let tagQuery = req.params.queryTag;

  fetch(urlBase + tagQuery + urlEnd)
  .then(response => {
    response.json()
    .then(json => {
        // console.log("recibido: " + JSON.stringify(json));
        let top10 = top10tags(listarTagsContados(listarTags(json)));
        res.json(top10);
      });
  })
  .catch(error => {
    console.log(error);
  });
  console.log()
});

//listado de todos los tags
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
const listarTagsContados = function(listTags){
  let listUniqueObjs = [];
  let listUniqueTags = [];
  for(let i=0; i<listTags.length;++i)
  {
    //recoge tag actual, quitandole el hashtag
    let tagActual = listTags[i].split("#")[1];

    let uniqueObj = listUniqueObjs.find((_obj)=>_obj.tag===tagActual);
    if(uniqueObj){
      uniqueObj.count++;
      // console.log("incrementado: " + JSON.stringify(uniqueObj));
    }
    else{
      let obj = {"tag":tagActual, "count":1};
      listUniqueTags.push(tagActual);
      listUniqueObjs.push(obj);
      // console.log("pusheado: " + JSON.stringify(obj));

    }
  }
  console.log(listUniqueObjs);
  return listUniqueObjs;

}

//top 10 tags
 const top10tags = function(listTags){
  //de mayor count a menor
  sortedList = listTags.sort((objA,objB)=>objB.count-objA.count);
  //solo los primeros 10
  return sortedList.slice(0,9);
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


/* GET home page. */
// router.get("/:query", function(req, res) {
//   console.log("req params "+req.params);
//   getFollowers(
//     {"user.screen_name":req.params.query}, 
//     (followers) => res.send(followers) 
//     );
// });

module.exports = router;
