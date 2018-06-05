const synopsis = require("./index/synopsis.js");
const commandersMessage = require("./index/commanders-message.js");
const theme = require("./theme.js");
const {fetch} = require("../../config");

const CONTENT_MAX_CHARACTERS = 500;


const missionStatement = async () => {
    return `
        <style>
            .statement {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
            }
        </style>
        <div>
            <blockquote class="blockquote statement" style="padding: 1em;">
              <span style="color: #333333;font-size:0.9em;font-weight: bold">Mission Statement</span>
              <p class="mb-0">The Joint Aviation Command Emerging Technology Office (ETO) mission is to stay aware of and direct future technologies 
              by leveraging the capabilities and knowledge of commercial industry, academia, and other goverment agencies.</p>
            </blockquote>
        </div>
    `
}

const getArticleTags = async () => {
    let articles = await fetch(`v1/articles?$p.tags=1`);
    if(articles.docs){
        let tags = articles.docs.map(tag => tag.tags).filter((value,index,self) => self.indexOf(value) == index);
        return tags;
    }
    return [];
};

const renderArticles = async (req) => {
    let articles = await fetch(`v1/articles?$i=5&$l=20&$s._createdOn=-1`);
    articles = articles.docs;
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
        <h3 style="font-size: 1em; color: #888; padding-top: 0em; padding-bottom: 0em;">By ${article.tags} on ${article.date}</h3>
        <div style="width: 100%">
            ${content}
        </div>
    </article>
    `};
    return articles.map(renderArticle).join('');
};


const renderLatestPost = async (req) => {
    let articles = await fetch(`v1/articles?$i=0&$l=5&$s._createdOn=-1`);
    articles = articles.docs;
    let maxChars = 250;
    let renderArticle = (article) => {
        let content = article.content ? article.content.replace(/<[^>]*>/g, "") : '';
        if(content.length > maxChars){
            content = `${content.substring(0,maxChars) }...`
        }
        return `
        <article style="padding-top: 0.5em; padding-bottom: 0.5em;">
            <h1 style="font-weight: 500; font-style: italic; margin: 6px 0; font-size: 1.3125em; line-height: 1.143;"><a href="${article.source}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
            <h3 style="font-size: 0.9em; font-weight: 300; color: #888; padding-top: 0.1em; padding-bottom: 0.1em;;">BY ${article.tags} on ${article.date}</h3>
            <p>
                ${content}
            </p>
        </article>
    `};
    return articles.map(renderArticle).join('');
};

const renderHighlightStories = async (req) => {
    let articles = await fetch(`v1/articles?$i=25&$l=5&$s._createdOn=-1`);
    articles = articles.docs;
    let maxChars = 150;
    let renderArticle = (article) => {
        let content = article.content ? article.content.replace(/<[^>]*>/g, "") : '';
        if(content.length > maxChars){
            content = `${content.substring(0,maxChars) }...`
        }
        return `
        <article style="border-bottom: 1px solid #F0F0F0; margin-bottom: 1.5em; padding-bottom: 0.5em;">
            <h1 style="font-weight: 500; font-size: 0.9em; line-height: 1.2em; text-transform: uppercase;"><a href="${article.source}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
            <h3 style="font-size: 0.7em; text-transform: uppercase;">BY ${article.tags} on ${article.date}</h3>
            <p style="font-size: 0.9em;margin-bottom: 0px">${content}</p>
        </article>
    `};
    return articles.map(renderArticle).join('');
};



const render = (req) => theme(req,
    `
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
<div style="border-bottom: 1px solid #F0F0F0;">
    ${req.print(missionStatement(req))}
</div>
<!--
<div class="heading-container">
    <section class="heading-synopsis">
        ${req.print(synopsis(req))}
    </section>
    <section class="heading-commanders-message">
        ${req.print(commandersMessage(req))}
    </section>
</div>
-->
<section class="stories-panel-container">
    <!-- This is the left side content for displaying latest post -->
    <aside class="stories-left-panel">
        <section style="font-weight: 700;color: #666666;line-height: 1.3;font-size: 1em;">Latest Posts</section>
        <section>
            ${req.print(renderLatestPost(req))}
        </section>
    </aside>
    <!-- This is main content to display main stories -->
    <main class="stories-center-panel">
        <section>
            ${req.print(renderArticles(req))}
        </section>
    </main>
    <!-- This is right side content for displaying highlight stories -->
    <aside class="stories-right-panel">
        <section>
            ${req.print(renderHighlightStories(req))}
        </section>
    </aside>
</section>
    `
);

module.exports = async function(req) {
    let tags = await getArticleTags();
    return render(req);
};