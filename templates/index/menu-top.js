const renderTag = (tag) => `<li style="padding: 0.8em;border-left: 1px solid #F0F0F0;border-right: 1px solid #F0F0F0;border-bottom: 1px solid #EEE"><a href="#" style="text-decoration:none; color: black">${tag}</a></li>`

module.exports = (tags) => {
    return `
    <menu style="border-top: 2px solid #333; border-bottom: 1px solid #CCC;display:flex">
    <ul style="width: 100%; display: flex; justify-content: center;flex-wrap: wrap;">
        <li style="padding: 0.8em;">Home</li>
        <li style="padding: 0.8em;position:relative;" 
            onmouseover="document.getElementById('menuNews').style.display = 'block'"
            onmouseleave="document.getElementById('menuNews').style.display = 'none'"
            >News Source <i class="fas fa-chevron-down" style="font-size: 0.7em;padding-left:0.8em"></i>
            <span id="menuNews" style="position:absolute; background: #FFF;left:0px; top: 100%;box-sizing: border-box;display:none;border-top:1px solid #CCC;width:200px">
                <!--
                <ul>
                    ${tags.map(renderTag).join('')}
                </ul>
                -->
            </span>
        </li>
    </ul>
    <ul style="display: flex;">
        <li style="text-align: center;display: flex;align-items: center;padding: 0.2em"><i class="material-icons" >contact_support</i>Contact</li>
        <li style="text-align: center;display: flex;align-items: center;padding: 0.2em"><i class="material-icons" >business</i>Industry</li>
    </ul>
</menu>

    `
};