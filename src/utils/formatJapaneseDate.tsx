import React from 'react';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs kiểu dữ liệu
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ja'; // Import ngôn ngữ Nhật

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('ja'); // Cài đặt ngôn ngữ Nhật

// Định nghĩa kiểu cho hàm định dạng
const formatJapaneseDate = (date: Dayjs): string => {
  const dayOfWeek = date.format('dd'); // Lấy ngày trong tuần (水)
  const formattedDate = date.format('MM月DD日'); // Định dạng ngày (10月3日)
  const time = date.format('HH時mm分'); // Định dạng giờ (0時30分)
  return `${formattedDate}(${dayOfWeek}) 深夜${time}`;
};

// Ví dụ sử dụng component React có dùng hàm định dạng
const DateFormatterExample: React.FC = () => {
  const exampleDate = dayjs(); // Lấy thời gian hiện tại

  return (
    <div>
      <p>Ngày được định dạng kiểu Nhật Bản: {formatJapaneseDate(exampleDate)}</p>
    </div>
  );
};

export default DateFormatterExample;
