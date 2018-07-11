class JavascriptEditor {
    constructor(node){
        this.node = node;
        this.input = node.querySelector('textarea');
        this.hidden = node.querySelector('input');
        const JavascriptMode = ace.require("ace/mode/javascript").Mode;
        const editor = ace.edit(this.input);
        editor.setTheme("ace/theme/chrome");
        editor.session.setMode(new JavascriptMode());
        editor.addEventListener('input',event => {
            this.hidden.value = editor.getValue();
            this.hidden.dispatchEvent(new Event('input'));
        })
    }
}

module.exports = JavascriptEditor;