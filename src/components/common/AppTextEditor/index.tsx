import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS của Quill
import './index.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
};

const TextEditor: React.FC<Props> = ({ value, onChange, isReadOnly = false }) => {
  const [content, setContent] = useState<string>(value || '');

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (content: string) => {
    setContent(content);
    onChange(content); // Truyền giá trị ra ngoài thông qua prop onChange
  };

  return (
    <ReactQuill
      className="react-quill-container"
      theme="snow"
      value={content}
      onChange={handleChange}
      readOnly={isReadOnly}
      placeholder="Nhập nội dung tại đây..."
      modules={{
        toolbar: isReadOnly
          ? false
          : [
              [{ 'header': [1, 2, false] }],
              [{ 'font': [] }], // Thêm lựa chọn font chữ
              [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px'] }], // Lựa chọn kích cỡ
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean'], // Nút loại bỏ định dạng
            ],
      }}
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
      ]}
    />
    
  );
};

export default TextEditor;
