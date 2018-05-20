const database = require('../json/database.js');
const url = require('url');
const http = require('http');
const https = require('https');
const sizeOf = require('image-size');

const getImageSize = (path) => {
    const imgUrl = path.toUpperCase();
    const options = url.parse(path);
    const protocol = imgUrl.indexOf('HTTPS://') == 0 ? https:http;
    return new Promise(resolve => {      
        protocol.get(options, function (response) {
            console.log('check image size '+imgUrl);
          let chunks = [];
          response.on('data', function (chunk) {
            chunks.push(chunk);
          }).on('end', function() {
            const buffer = Buffer.concat(chunks);
            resolve(sizeOf(buffer));
          });
        });    
    });
}


module.exports = async (req,res) => {
    const doc = req.body;
    
    if(!(doc.featureImage && doc.featureImage.length > 20)){
        res.end('no feature image');
        return;
    }
    let dimension = await getImageSize(doc.featureImage);
    if(dimension.width < 300){
        res.end('image is to small');
        return;
    }
    
    doc._createdOn = new Date().getTime();
    const db = database.articles;
    
    db.find({ title: doc.title }, function (err, docs) {
      // docs is an array containing documents Mars, Earth, Jupiter
      // If no document is found, docs is equal to []
      if(err){
        res.end(JSON.stringify(err,null,2));
      }else if(docs.length == 0){
        db.insert(doc,(err,newDoc) => {
            if(err){
                res.end(JSON.stringify(err,null,2));
            }else{
                res.end(JSON.stringify(newDoc,null,2));
            }
        });      
      }else{
          res.end('record with same title already exist');
      }
    });
    
};
