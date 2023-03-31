import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';

const QuillEditor = () => {
    const [quill, setQuill] = useState(null);
    let newQuill: any = null;
    var toolbarOptions = [['bold', 'italic'], ['link', 'image'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],];
    useEffect(() => {
        if (quill === null) {
            newQuill = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
            setQuill(newQuill);
        }
    }, [quill]);

    return (
        <div>
            <div id="editor" />
        </div>
    );
}

export default QuillEditor;

function setText(value: any) {
    throw new Error('Function not implemented.');
}
