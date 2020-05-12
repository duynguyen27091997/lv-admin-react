import React, {useEffect, useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


const EditorJavascript = (props) => {
    const [code,setCode]= useState( `function onLoad(editor) {

    console.log("i've loaded");
    
}`)
    useEffect(_=>{
        props.onChange(code)
    },[code, props])

    const handleChange = (value)=>{
        setCode(value);
    }
    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            name="UNIQUE_ID_OF_DIV"
            fontSize={16}
            showPrintMargin={true}
            onChange={handleChange}
            showGutter={true}
            width={'100%'}
            highlightActiveLine={true}
            value={code}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true}}
        />
    );
};

export default EditorJavascript;
