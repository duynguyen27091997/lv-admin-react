import React, {Component} from 'react';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

class EditorC extends Component {
    render() {
        return (
            <AceEditor
                mode="c_cpp"
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                width={'100%'}
                highlightActiveLine={true}
                value={`#include <studio.h>`}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true}}
            />
        );
    }
}

export default EditorC;