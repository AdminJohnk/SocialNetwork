import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';

const QuillEditor = () => {
    const [quill, setQuill] = useState(null);
    // const [quill, setQuill] = useState<Quill.Quill | null>(null);
    let newQuill: any = null;
    const [numImages, setNumImages] = useState<number>(0);
    const MAX_IMAGES = 1;

    // const handleImageInserted = () => {
    //     const numImagesInserted = quill?.container.querySelectorAll('img').length || 0;
    //     setNumImages(numImagesInserted);
    //     if (numImagesInserted > MAX_IMAGES) {
    //         quill?.deleteText(-1, 1);
    //         alert(`You can only insert up to ${MAX_IMAGES} images`);
    //     }
    // };

    var toolbarOptions = [
        ['bold', 'italic'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['align',
            { 'align': ['center'] },
            { 'align': ['right'] },
            { 'align': ['justify'] }],
        ['link', 'image'],
        ['clean']];
    useEffect(() => {
        if (quill === null) {
            newQuill = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                placeholder: 'Share your thoughts...',
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
