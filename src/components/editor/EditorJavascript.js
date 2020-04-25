import React, {Component} from 'react';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

class EditorJavascript extends Component {
    render() {
        return (
            <AceEditor
                mode="javascript"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                width={'100%'}
                highlightActiveLine={true}
                value={
                    `function onLoad(editor) {

    console.log("i've loaded");
    
}`}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true}}
            />
        );
    }
}

export default EditorJavascript;