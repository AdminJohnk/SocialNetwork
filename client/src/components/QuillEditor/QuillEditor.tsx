import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = () => {
    let [quill, setQuill]: any = useState(null);


    var toolbarOptions = [
        ['bold', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['clean']];
    useEffect(() => {
        if (quill === null) {
            quill = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                placeholder: 'Share your thoughts...',
                theme: 'snow'
            });


            const addButton: any = document.getElementById('add-button');
            addButton.addEventListener('click', function () {
                const cursorPosition = quill.getSelection().index;
                quill.insertText(cursorPosition, 'A');
            });

            quill.on('text-change', function () {
                var text = quill.container.firstChild.innerHTML;
                if (text.includes('<p><br></p>')) {
                    text = text.replace('<p><br></p>', '<p></p>');
                }
                console.log(text);
            });

            setQuill(quill);
        }
    }, [quill]);


    return (
        <div>
            <div id="editor" className='text-change' />
            <button id='add-button'> A </button>
        </div>
    );
}
export default QuillEditor;

