const database = require("./../intents/json/database.js");
const synopsis = require("./index/synopsis.js");
const commandersMessage = require("./index/commanders-message.js");
const menuTop = require("./index/menu-top.js");
const theme = require("./theme.js");

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
        let content = article.content ? article.content.replace(/<[^>]*>/g, "") : '';
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
        let content = article.content ? article.content.replace(/<[^>]*>/g, "") : '';
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



const render = ({articles,latestArticles,highlightArticles,tags}) => theme(
    `
${menuTop(articles)}
<style>

    .stories-left-panel {
        width: 20%;box-sizing: border-box;
        order: 1;
    }
    
    .stories-right-panel {
        width: 20%;box-sizing: border-box;
        order: 3;
    }
    
    .stories-center-panel{
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
    
    .stories-panel-container {
        padding-top: 1em; 
        display: flex;
    }
    
    .heading-container {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #F0F0F0;
    }
    
    .heading-synopsis {
        width : 50%;
    }
    
    .heading-commanders-message {
        width : 50%;
    }
    
    @media screen and (max-width: 900px){
        .stories-left-panel{
            width: 30%;
            order: 1;
        }
        
        .stories-center-panel{
            width: 70%;
            margin: 0;
            border: none;
            padding: 0;
            order: 2;
        }
        
        .stories-right-panel {
            width : 100%;
            order: 3;
        }
        .stories-panel-container {
            flex-wrap : wrap;
        }
    }
    
    @media screen and (max-width: 600px){
        .stories-left-panel{
            width: 100%;
            order: 2;
        }
        
        .stories-right-panel {
            width : 100%;
            order: 3;
        }
        
        .stories-center-panel{
            width: 100%;
            margin: 0;
            border: none;
            padding: 0;
            order: 1;
        }
        
        .stories-panel-container {
            flex-wrap : wrap;
        }
        
        .heading-synopsis {
            width : 100%;
        }
        
        .heading-commanders-message {
            width : 100%;
        }
    }
    
</style>
<div class="heading-container">
    <section class="heading-synopsis">
        ${synopsis()}
    </section>
    <section class="heading-commanders-message">
        ${commandersMessage()}
    </section>
</div>

<section class="stories-panel-container">
    <!-- This is the left side content for displaying latest post -->
    <aside class="stories-left-panel">
        <section style="font-weight: 700;color: #666666;line-height: 1.3;font-size: 1em;">Latest Posts</section>
        <section>
            ${renderLatestPost(latestArticles)}
        </section>
    </aside>
    <!-- This is main content to display main stories -->
    <main class="stories-center-panel">
        <section>
            ${renderArticles(articles)}
        </section>
    </main>
    <!-- This is right side content for displaying highlight stories -->
    <aside class="stories-right-panel">
        <section>
            ${renderHighlightStories(highlightArticles)}
        </section>
    </aside>
</section>
    `
);

module.exports = async function(req,res) {
    let articles = await getArticles();
    let latestArticles = await getLatestArticles();
    let highlightArticles = await getHightlightArticles();
    let tags = await getArticleTags();
    res.end(render({articles,latestArticles,highlightArticles,tags}))
};