const express = require("express");
const assert = require("assert");
const router = express.Router();
const fetch = require("node-fetch");
const mongoDB = require("./db.js");
//ZONA INSTAGRAM----------------------------------------------------
const urlBase = "https://www.instagram.com/explore/tags/";
const urlEnd = "?__a=1";

//acceso a instagram
const getTags = function(req, res) {
  let tagQuery = req.params.queryTag;
  fetch(urlBase + tagQuery + urlEnd)
  .then(response => {
    response.json()
    .then(json => {
        // console.log("recibido: " + JSON.stringify(json));
        console.log("buscando Top 10 para el tag: " + tagQuery);
        let top10 = top10tags(listarTagsContados(listarTags(json, tagQuery)));
        res.json(top10);
        //agrego tag entre los buscados, o actualizo su fecha
        mongoDB.upsertTag(tagQuery);

      });
  })
  .catch(error => {
    res.send("No se consiguieron registros para "+tagQuery+". Intente nuevamente")
    console.log("Error en el fetch: "+error);
  });
}


//listado de todos los tags
const listarTags = function(_json, _tagQuery){
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
      if(w.split("#")[1]===_tagQuery)
        continue;
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
  // console.log(listUniqueObjs);
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

const findSearchedTags = function(req,res){
  let searchedTags = mongoDB.findSearchedTags((_docs)=>{
    res.json(_docs);
  });
}



router.get("/tag/:queryTag", getTags);
router.get("/searchedTags/", findSearchedTags);



// Connection URL



module.exports = router;
