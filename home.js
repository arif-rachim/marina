const database = require("./lib/database.js");
const CONTENT_MAX_CHARACTERS = 500;
const getArticles = () => {
    return new Promise(resolve => {
        database.articles.find({},(err,articles) => {
            resolve(articles);
        })    
    });
}

const renderArticles = (articles) => {
    let renderArticle = (article) => {
        let content = article.content.replace(/<[^>]*>/g, "");
        if(content.length > CONTENT_MAX_CHARACTERS){
            content = `${content.substring(0,CONTENT_MAX_CHARACTERS) }...`
        }
        return `
    <article style="border-bottom: 1px solid #DDD; margin-bottom: 1.5em; padding-bottom: 0.5em;">
        <a href="${article.external_url}" target="_blank">
            <img src="${article.image_url}" style="width: 100%;border-radius: 20px;background-color: #ddd">
        </a>
        <h1 style="font-weight: 400; font-size: 1.8em; line-height: 1.4;"><a href="${article.external_url}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
        <h3 style="font-size: 0.8em; color: #888; padding-top: 0em; padding-bottom: 0.8em;">By ${article.autor} on ${article.published_date}</h3>
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
        <article class="article-component-medium">
            <h1><a href="${article.external_url}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
            <h3>BY ${article.autor} on ${article.published_date}</h3>
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
        <article style="margin-bottom: 1em;">
            <h1 style="font-size: 0.9em; line-height: 1.8em; text-transform: uppercase;"><a href="${article.external_url}" target="_blank" style="text-decoration: none; color: black;">${article.title}</a></h1>
            <h3 style="font-size: 0.7em; text-transform: uppercase;">BY ${article.autor} on ${article.published_date}</h3>
            <p style="font-size: 0.9em;">${content}</p>
        </article>
    `};
    return articles.map(renderArticle).join('');
}



const render = ({articles}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Commander's Emerging Technology</title>
    <link href="styles/reset.css" rel="stylesheet">
    <link href="styles/font-family.css" rel="stylesheet">
    <link href="styles/app.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: 'PT Sans'; font-weight: 400; padding-left: 1em; padding-right: 1em; line-height: 1.4em; max-width: 1200px; margin: auto;">
<section style="display: flex; justify-content: center;">
    <span style="padding-top:1em;padding-bottom:1em;">
        <div style="font-family: 'Abril Fatface', 'Arial Black', cursive; font-size: 2.3em; line-height: 1.4; text-align: center;">CETC</div>
        <p style="font-family: 'PT Serif', serif; line-height: 1.5; font-style: italic; text-align: center;">Commander's Emerging Technology Center</p>
    </span>
</section>

<menu style="border-top: 2px solid #333; border-bottom: 1px solid #CCC;">
    <ul style=" display: flex; justify-content: center;">
        <li style="padding: 0.8em;">Events</li>
        <li style="padding: 0.8em;">Contacts</li>
        <li style="padding: 0.8em;">Home</li>
    </ul>
</menu>

<section style="padding-top: 1em; display: flex;">
    <!-- This is the left side content for displaying latest post -->
    <aside style="width: 20%">
        <section style="font-weight: 700;color: #666666;line-height: 1.3;font-size: 1em;">Latest Posts</section>
        <section>
            ${renderLatestPost(articles)}
        </section>
    </aside>
    <!-- This is main content to display main stories -->
    <main style="width: 60%; padding-right: 1em; padding-left: 1em">
        <section>
            ${renderArticles(articles)}
        </section>
    </main>
    <!-- This is right side content for displaying highlight stories -->
    <aside style="width:20%">
        <section>
            ${renderHighlightStories(articles)}
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
    res.end(render({articles}))
}