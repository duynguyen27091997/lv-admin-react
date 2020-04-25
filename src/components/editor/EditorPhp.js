import React, {Component} from 'react';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

class EditorPhp extends Component {
    render() {
        return (
            <AceEditor
                mode="php"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                width={'100%'}
                highlightActiveLine={true}
                value={
                    `<?php

  
    
?>`}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true}}
            />
        );
    }
}

export default EditorPhp;