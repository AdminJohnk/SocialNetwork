import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
// import ImageResize from 'quill-image-resize-module';

const QuillEditor = () => {
    let [quill, setQuill]: any = useState(null);
    const editorRef: any = useRef(null);

    var toolbarOptions = [
        ['bold', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['image'],
        ['clean']];


    useEffect(() => {
        if (quill === null) {
            quill = new Quill(editorRef.current, {
                modules: {
                    toolbar: toolbarOptions,
                },
                // imageResize: {
                //     displayStyles: {
                //         backgroundColor: 'black',
                //         border: 'none',
                //         color: 'white',
                //     },
                //     handleStyles: {
                //         backgroundColor: 'white',
                //         border: 'none',
                //     },
                //     modules: ['Resize', 'DisplaySize', 'Toolbar'],
                //     limit: 1, // Giới hạn số lượng hình ảnh được chèn
                // },

                placeholder: 'Share your thoughts...',
                theme: 'snow'
            });
            const addButton: any = document.getElementById('add-button');
            addButton.addEventListener('click', function () {
                const cursorPosition = quill.getSelection().index;
                quill.insertText(cursorPosition, 'A');
            });

            // Lấy nội dung content
            quill.on('text-change', function () {
                handleTextChange()
            });

            // chặn paste hơn 1 hình ảnh vào content
            quill.root.addEventListener('paste', (event: any) => {
                const clipboardData = event.clipboardData;
                const types = clipboardData.types;
                const count = quill.container.firstChild.querySelectorAll('img').length;
                // Kiểm tra xem loại dữ liệu dán vào có phải là image hay không và số lượng hình ảnh trong content có lớn hơn 1 hay không
                if (types.indexOf('Files') !== -1 && count >= 1) {
                    // Ngăn chặn việc dán hình ảnh
                    event.preventDefault();
                }
            });

            setQuill(quill);
        }
    }, []);




    function handleTextChange() {
        var text = quill.container.firstChild.innerHTML;
        // if (text.includes('<p><br></p>')) {
        //     text = text.replace('<p><br></p>', '<p></p>');
        // }
        console.log(text);
    }


    return (
        <div>
            <div ref={editorRef} className='text-change' />
            <button id='add-button'> A </button>
        </div>
    );
}
export default QuillEditor;
