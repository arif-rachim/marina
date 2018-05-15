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
    <article class="article-component-story">
        <img src="${article.image_url}" style="width: 100%;border-radius: 20px;background-color: #ddd">
        <h1>${article.title}</h1>
        <h3>By ${article.autor} on ${article.published_date}</h3>
        <div style="width: 100%">
            ${content}
        </div>
    </article>
    `};
    return articles.map(renderArticle).join('');
}

const render = ({articles}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Skeleton</title>
    <link href="styles/reset.css" rel="stylesheet">
    <link href="styles/font-family.css" rel="stylesheet">
    <link href="styles/app.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<section class="banner">
    <span class="banner-title">
        <div class="banner-title--heading">CETC</div>
        <p class="banner-title--heading-subtitle">Commander's Emerging Technology Center</p>
    </span>
</section>

<menu class="menu-main">
    <ul class="menu-main-component">
        <li>Events</li>
        <li>Contacts</li>
        <li>Home</li>
    </ul>
</menu>

<section class="content">
    <!-- This is the left side content for displaying latest post -->
    <aside style="width: 20%">
        <section class="content--side-left-title">Latest Posts</section>
        <section>
            <article class="article-component-medium">
                <h1>RZNAF Replaces B200 With KA350</h1>
                <h3>BY ALERT5</h3>
                <p>
                    New Zealand’s Minister of Defence Ron Mark has announced the first of four leased KingAir KA350 aircraft has been certified for use by the Royal…
                </p>
            </article>
            <article class="article-component-medium">
                <h1>RZNAF Replaces B200 With KA350</h1>
                <h3>BY ALERT5</h3>
                <p>
                    New Zealand’s Minister of Defence Ron Mark has announced the first of four leased KingAir KA350 aircraft has been certified for use by the Royal…
                </p>
            </article>
            <article class="article-component-medium">
                <h1>RZNAF Replaces B200 With KA350</h1>
                <h3>BY ALERT5</h3>
                <p>
                    New Zealand’s Minister of Defence Ron Mark has announced the first of four leased KingAir KA350 aircraft has been certified for use by the Royal…
                </p>
            </article>
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
            <article class="article-component-small">
                <h1>RZNAF Replaces B200 With KA350</h1>
                <h3>By Alert5</h3>
                <p>
                    New Zealand’s Minister of Defence Ron Mark has announced the first of four leased KingAir KA350 aircraft has been certified for use by the Royal…
                </p>
            </article>
            <article class="article-component-small">
                <h1>RZNAF Replaces B200 With KA350</h1>
                <h3>By Alert5</h3>
                <p>
                    New Zealand’s Minister of Defence Ron Mark has announced the first of four leased KingAir KA350 aircraft has been certified for use by the Royal…
                </p>
            </article>
            <article class="article-component-small">
                <h1>RZNAF Replaces B200 With KA350</h1>
                <h3>By Alert5</h3>
                <p>
                    New Zealand’s Minister of Defence Ron Mark has announced the first of four leased KingAir KA350 aircraft has been certified for use by the Royal…
                </p>
            </article>
        </section>
    </aside>
</section>
<section class="footer">
    <span>
        <div class="banner-footer--heading">CETC</div>
        <p class="banner-footer--heading-subtitle">Commander's Emerging Technology Center</p>
    </span>
</section>
</body>
</html>
`;

module.exports = async function(req,res) {
    let articles = await getArticles();
    res.end(render({articles}))
}