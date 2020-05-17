import React, {useEffect, useState} from 'react';
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const EditorJava = (props) => {
    const [code,setCode]= useState( props.code || "")

    useEffect(_=>{
        setCode(props.code)
        props.onChange(props.code)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.code])

    const handleChange = (value)=>{
        setCode(value);
        props.onChange(value)

    }
    return (
        <AceEditor
            mode="java"
            theme="monokai"
            name="UNIQUE_ID_OF_DIV"
            fontSize={16}
            showPrintMargin={true}
            readOnly={props.readOnly}
            onChange={handleChange}
            showGutter={true}
            width={'100%'}
            highlightActiveLine={true}
            value={code}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true
            }}
        />
    );
}

export default EditorJava;