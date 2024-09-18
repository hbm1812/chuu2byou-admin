import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS của Quill
import './index.css';
type Props = {
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
};

const RichTextEditor: React.FC<Props> = ({ value, onChange, isReadOnly = false }) => {
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
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean'], // Nút loại bỏ định dạng
            ],
      }}
      formats={[
        'header',
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

export default RichTextEditor;
