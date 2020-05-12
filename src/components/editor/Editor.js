import React from 'react';
import EditorJavascript from "./EditorJavascript";
import EditorPhp from "./EditorPhp";
import EditorC from "./EditorC";
import EditorJava from "./EditorJava";
import EditorPascal from "./EditorPascal";

const Editor = (props) => {
    const components = {
        javascript : EditorJavascript,
        php : EditorPhp,
        c:EditorC,
        'c++':EditorC,
        java:EditorJava,
        pascal:EditorPascal
    };
    const TypeComponent = components[props.type.toLowerCase() || 'javascript'];
    return (
        <TypeComponent {...props} onChange={(code)=>props.change(code)}>

        </TypeComponent>
    );
};

export default Editor;