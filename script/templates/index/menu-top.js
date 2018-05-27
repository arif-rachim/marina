module.exports = (tags,user) => {
    return `
    <script type="module">import href from '/script/webcomponents/comp/a.js'; customElements.define('m-a',href);</script>
    <menu style="border-top: 2px solid #333; border-bottom: 1px solid #CCC;display:flex;justify-content:flex-end;padding:0.3em">
        <m-a href="#">Login</m-a>
    </menu>
    `;
}