const {db} = require('../lib/api.js');

const post = (req,res) => {
  const user_name = req.body.user;
  const password = req.body.password;
  
  const doc = {
      "type" : "ARTICLES",
      "title" : req.body.title,
      "content" : req.body.content,
      "url" : req.body.url,
      "author" : req.body.author,
      "published_date" : req.body.published_date,
      "image_url" : req.body.image_url
  };
  
  db.insert(doc,(err,newDoc) => {
      if(err){
        res.end(JSON.stringify(err,null,2));
      }else{
        res.end(JSON.stringify(newDoc,null,2));          
      }
  });
};



const get = (req,res) => {
    db.find({type:"ARTICLES"},(err,docs) => {
        res.end(JSON.stringify(docs));
    });
};
const component = (req,res) =>{

    db.find({type:"ARTICLES"},(err,docs) => {
        res.send(articlesComponent(docs));
    });

    function articlesComponent(articles) {
        function articleComponent(article) {
            return `
        <div>${article.title}</div>
        <div>${article.author}</div>
        <div>${article.content}</div>
        `
        }
        return `
    <div >
        ${articles.map(articleComponent)}
    </div>
    `;
    }
};



module.exports = {post,get,component};