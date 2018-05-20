const database = require("./lib/json/database.js");
const synopsis = require("./panels/synopsis.js");
const commandersMessage = require("./panels/commanders-message.js");
const contactsLinks = require("./panels/contacts-link.js");

const CONTENT_MAX_CHARACTERS = 500;

const getArticles = () => {
    return new Promise(resolve => {
        database.articles.find({}).sort({_createdOn: -1}).skip(5).limit(20).exec((err,articles) => {
            resolve(articles);
        });
    });
}

const getLatestArticles = () => {
    return new Promise(resolve => {
        database.articles.find({}).sort({ _createdOn: -1}).limit(5).exec((err,articles) => {
            resolve(articles);
        });
    });
}

const getArticleTags = () => {
    return new Promise(resolve => {
        database.articles.find({}).projection({ tags: 1}).exec((err,tags) => {
            tags = tags.map(tag => tag.tags).filter((value,index,self) => self.indexOf(value) == index);
            resolve(tags);
        });
    });
}

const getHightlightArticles  = () => {
    return new Promise(resolve => {
        database.articles.find({}).sort({_createdOn: -1}).skip(25).limit(5).exec((err,articles) => {
            resolve(articles);
        });
    });
}

const renderArticles = (articles) => {
    let renderArticle = (article) => {
        let content = article.content.replace(/<[^>]*>/g, "");
        if(content.length > CONTENT_MAX_CHARACTERS){
            content = `${content.substring(0,CONTENT_MAX_CHARACTERS) }...`
        }
        return `
    <article style="border-bottom: 1px solid #F0F0F0; margin-bottom: 1.5em; padding-bottom: 0.5em;">
        <a href="${article.source}" target="_blank">
            <img src="${article.featureImage}" style="width: 100%;border-radius: 20px;background-color: #ddd">
        </a>
        <h1 style="font-weight: 400; font-size: 1.8em; line-height: 1.4;"><a href="${article.source}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
        <h3 style="font-size: 0.8em; color: #888; padding-top: 0em; padding-bottom: 0.8em;">By ${article.tags} on ${article.date}</h3>
        <div style="width: 100%">
            ${content}
        </div>
    </article>
    `};
    return articles.map(renderArticle).join('');
}


const renderLatestPost = (articles) => {
    let maxChars = 250;
    let renderArticle = (article) => {
        let content = article.content.replace(/<[^>]*>/g, "");
        if(content.length > maxChars){
            content = `${content.substring(0,maxChars) }...`
        }
        return `
        <article style="padding-top: 0.5em; padding-bottom: 0.5em;">
            <h1 style="font-weight: 700; font-style: italic; margin: 6px 0; font-size: 1.3125em; line-height: 1.143;"><a href="${article.source}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
            <h3 style="font-size: 0.8em; color: #888; padding-top: 0.1em; padding-bottom: 0.1em;">BY ${article.tags} on ${article.date}</h3>
            <p>
                ${content}
            </p>
        </article>
    `};
    return articles.map(renderArticle).join('');
}

const renderHighlightStories = (articles) => {
    let maxChars = 150;
    let renderArticle = (article) => {
        let content = article.content.replace(/<[^>]*>/g, "");
        if(content.length > maxChars){
            content = `${content.substring(0,maxChars) }...`
        }
        return `
        <article style="border-bottom: 1px solid #F0F0F0; margin-bottom: 1.5em; padding-bottom: 0.5em;">
            <h1 style="font-weight: 700; font-size: 0.9em; line-height: 1.8em; text-transform: uppercase;"><a href="${article.source}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
            <h3 style="font-size: 0.7em; text-transform: uppercase;">BY ${article.tags} on ${article.date}</h3>
            <p style="font-size: 0.9em;">${content}</p>
        </article>
    `};
    return articles.map(renderArticle).join('');
}

const renderTag = (tag) => `<li style="padding: 0.8em;border-left: 1px solid #F0F0F0;border-right: 1px solid #F0F0F0;border-bottom: 1px solid #EEE"><a href="#" style="text-decoration:none; color: black">${tag}</a></li>`

const render = ({articles,latestArticles,highlightArticles,tags}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Commander's Emerging Technology</title>
    <link href="styles/reset.css" rel="stylesheet">
    <link href="styles/font-family.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
</head>
<body style="font-family: 'PT Sans'; font-weight: 400; padding-left: 1em; padding-right: 1em; line-height: 1.4em; max-width: 1200px; margin: auto;">
<section style="display: flex; justify-content: center;">
    <span style="padding-top:1em;padding-bottom:1em;">
        <div style="font-family: 'Abril Fatface', 'Arial Black', cursive; font-size: 2.3em; line-height: 1.4; text-align: center;">CETC</div>
        <p style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic; text-align: center;">Commander's Emerging Technology Center</p>
    </span>
</section>

<menu style="border-top: 2px solid #333; border-bottom: 1px solid #CCC;">
    <ul style=" display: flex; justify-content: center;flex-wrap: wrap;">
        <li style="padding: 0.8em;">Home</li>
        <li style="padding: 0.8em;position:relative;" 
            onmouseover="document.getElementById('menuNews').style.display = 'block'"
            onmouseleave="document.getElementById('menuNews').style.display = 'none'"
            >News Source <i class="fas fa-chevron-down" style="font-size: 0.7em;padding-left:0.8em"></i>
            <span id="menuNews" style="position:absolute; background: #FFF;left:0px; top: 100%;box-sizing: border-box;display:none;border-top:1px solid #CCC;width:200px">
                <ul>
                    ${tags.map(renderTag).join('')}
                </ul>
            </span>
        </li>
    </ul>
</menu>
<style>

    .side-panel {
        width: 20%;box-sizing: border-box;
        order: 1;
    }
    
    .side-right-panel {
        width: 20%;box-sizing: border-box;
        order: 3;
    }
    
    .center-panel{
        width: 60%;
        box-sizing: border-box; 
        padding-right: 1em; 
        padding-left: 1em; 
        border-right:1px solid #F0F0F0; 
        border-left:1px solid #F0F0F0; 
        margin-right : 1em;
        margin-left: 1em;
        order: 2;
    }
    
    .panel-container {
        padding-top: 1em; 
        display: flex;
    }
    
    .two-col-container {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #F0F0F0;
    }
    
    .two-col-container--child-one {
        width : 40%;
    }
    
    .two-col-container--child-two {
        width : 60%;
    }
    
    
    @media screen and (max-width: 900px){
        .side-panel{
            width: 30%;
            order: 1;
        }
        
        .center-panel{
            width: 70%;
            margin: 0;
            border: none;
            padding: none;
            order: 2;
        }
        
        .side-right-panel {
            width : 100%;
            order: 3;
        }
        .panel-container {
            flex-wrap : wrap;
        }
    }
    
    @media screen and (max-width: 600px){
        .side-panel{
            width: 100%;
            order: 2;
        }
        
        .side-right-panel {
            width : 100%;
            order: 3;
        }
        
        .center-panel{
            width: 100%;
            margin: 0;
            border: none;
            padding: none;
            order: 1;
        }
        
        .panel-container {
            flex-wrap : wrap;
        }
        
        .two-col-container--child-one {
            width : 100%;
        }
        
        .two-col-container--child-two {
            width : 100%;
        }
    }
    
    

</style>
<div class="two-col-container">
    <section class="two-col-container--child-one">
        ${synopsis()}
    </section>
    <section class="two-col-container--child-two">
        ${commandersMessage()}
    </section>
</div>

<section class="panel-container">
    <!-- This is the left side content for displaying latest post -->
    <aside class="side-panel">
        <!--
        <section>
            ${contactsLinks()}
        </section>
        -->
        <section style="font-weight: 700;color: #666666;line-height: 1.3;font-size: 1em;">Latest Posts</section>
        <section>
            ${renderLatestPost(latestArticles)}
        </section>
    </aside>
    <!-- This is main content to display main stories -->
    <main class="center-panel">
        <section>
            ${renderArticles(articles)}
        </section>
    </main>
    <!-- This is right side content for displaying highlight stories -->
    <aside class="side-right-panel">
        <section>
            ${renderHighlightStories(highlightArticles)}
        </section>
    </aside>
</section>
<section style="margin-bottom: 1em;">
    <span>
        <div style="font-family: 'Abril Fatface', 'Arial Black', cursive; font-size: 1.5em; line-height: 1.4; text-align: center;">CETC</div>
        <p style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic; text-align: center;">Commander's Emerging Technology Center</p>
    </span>
</section>
</body>
</html>
`;

module.exports = async function(req,res) {
    let articles = await getArticles();
    let latestArticles = await getLatestArticles();
    let highlightArticles = await getHightlightArticles();
    let tags = await getArticleTags();
    res.end(render({articles,latestArticles,highlightArticles,tags}))
}