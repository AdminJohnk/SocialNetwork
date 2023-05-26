import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../util/functions/ThemeFunction';
import { ConfigProvider } from 'antd';
import StyleTotal from './cssQuillEdit';
import ImageCompress from 'quill-image-compress';
import { setHandleSubmit } from '../../redux/Slice/ModalHOCSlice';

Quill.register('modules/imageCompress', ImageCompress);
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'clean'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link'],
];

interface QuillEditProps {
  placeholder: string;
  content: string;
  callbackFuntion: (value: String) => void;
}

const QuillEdit = (Props: QuillEditProps) => {
  const dispatch = useDispatch();
  // Lấy theme từ LocalStorage chuyển qua css
  const { change } = useSelector((state: any) => state.themeReducer);
  const { themeColor } = getTheme();
  const { themeColorSet } = getTheme();

  const [value, setValue] = useState<any>(Props.content);

  // Quill Editor
  let [quill, setQuill] = useState<any>(null);

  useEffect(() => {
    // Tạo quill
    quill = new Quill('#editorDrawer', {
      placeholder: Props.placeholder,
      modules: {
        syntax: true,
        toolbar: toolbarOptions,
      },
      theme: 'snow',
      scrollingContainer: '#scrolling-container',
    });
    quill.on('text-change', function () {
      handleQuillChange();
    });

    // Ngăn chặn paste text vào quill
    // C1
    quill.root.addEventListener('paste', (event: any) => {
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');

      const textToHTMLWithTabAndSpace = text
        .replace(/\n/g, '<br>')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
        .replace(/ /g, '&nbsp;');

      console.log(textToHTMLWithTabAndSpace);

      document.execCommand('insertHTML', false, textToHTMLWithTabAndSpace);
    });

    setQuill(quill);
  }, []);

  useEffect(() => {
    // Hiển thị nội dung trong quill
    quill.root.innerHTML = Props.content;
    setQuill(quill);
  }, [Props, quill]);

  const handleQuillChangeValue = () => {
    // Kiểm tra nếu không có nội dung set value = ''
    const HTML = new DOMParser().parseFromString(value, 'text/html').body.innerText;
    if (HTML === '') Props.callbackFuntion('');
    else Props.callbackFuntion(value);
  };

  useEffect(() => {
    // Dispatch callback submit lên cho DrawerHOC
    dispatch(setHandleSubmit(handleQuillChangeValue));
  }, [value]);

  const handleQuillChange = () => {
    const text = quill.root.innerHTML;
    setValue(text);
  };

  return (
    <ConfigProvider
      theme={{
        token: themeColor,
      }}
    >
      <StyleTotal theme={themeColorSet}>
        <div id="editorDrawer" />
      </StyleTotal>
    </ConfigProvider>
  );
};

export default QuillEdit;
