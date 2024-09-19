import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS của Quill
// import ImageResize from 'quill-image-resize-module'; // Import plugin
import './index.css';
import { Quill } from 'react-quill'; 
// Đăng ký module imageResize
// Quill.register('modules/imageResize', ImageResize);
type Props = {
  value: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
};

const AppImageSelect: React.FC<Props> = ({ value, onChange, isReadOnly = false }) => {
  const [content, setContent] = useState<string>(value || '');

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (content: string) => {
    // Kiểm tra nếu nội dung có nhiều hơn 1 ảnh, xóa bớt ảnh cũ
    const imgTags = content.match(/<img[^>]+src="[^">]+"/g);
    if (imgTags && imgTags.length > 1) {
      const updatedContent = content.replace(imgTags[0], ''); // Xóa ảnh đầu tiên
      setContent(updatedContent);
      onChange(updatedContent);
    } else {
      setContent(content);
      onChange(content); // Truyền giá trị ra ngoài thông qua prop onChange
    }
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
        // // Thêm module hỗ trợ thay đổi kích thước ảnh
        // imageResize: {
        //   modules: ['Resize'], // Chỉ sử dụng tính năng Resize
        // },
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

export default AppImageSelect;
