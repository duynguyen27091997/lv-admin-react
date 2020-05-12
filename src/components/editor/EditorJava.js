import React, {Component} from 'react';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

class EditorJava extends Component {
    render() {
        return (
            <AceEditor
                mode="java"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                width={'100%'}
                highlightActiveLine={true}
                value={
                    ``}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true}}
            />
        );
    }
}

export default EditorJava;