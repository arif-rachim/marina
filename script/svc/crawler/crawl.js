// ok lets crawl the website
const fetch = require('node-fetch');
const CONTENT_START_MARKER = '<pre class="prettyprint linenums">';
const CONTENT_END_MARKER = '</pre>';
const CONVERTER = {
    '&amp;' : '&',
    '&quot;' : '"',
    '&lt;' : '<',
    '&gt;' : '>'
};
const fetchUrl = async (url) => {
    const embedlyUrl = `http://embed.ly/docs/explore/extract?url=${encodeURIComponent(url)}`;
    const response = await fetch(embedlyUrl);
    const data = await response.text();
    const startIndex = data.indexOf(CONTENT_START_MARKER)+CONTENT_START_MARKER.length;
    const endIndex = data.indexOf(CONTENT_END_MARKER,startIndex);
    if(startIndex && endIndex){
        let convertedData = data.substring(startIndex,endIndex);
        convertedData = convertedData.split('&amp;').join('&');
        for (var key in CONVERTER) {
            if (CONVERTER.hasOwnProperty(key)) {
                convertedData = convertedData.split(key).join(CONVERTER[key]);
            }
        }
        return convertedData;
    }
    return '';
};

module.exports = async (req,res) => {
    const url = req.query.url || req.body.url;
    const data = await fetchUrl(url);
    res.end(data);
};