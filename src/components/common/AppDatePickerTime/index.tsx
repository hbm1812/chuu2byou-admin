import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // Import locale Nhật Bản
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('ja'); // Đặt locale là Nhật Bản

const AppDatePickerTime: React.FC = () => {
  // Hàm format theo kiểu Nhật Bản
  const formatJapaneseDate = (value: dayjs.Dayjs | null) => {
    if (!value) return '';
    const dayOfWeek = value.format('dd'); // (水)
    const formattedDate = value.format('MM月DD日'); // 10月3日
    const time = value.format('HH時mm分'); // 0時30分
    const isLateNight = value.hour() < 5 ? '深夜' : ''; // Để xác định 深夜
    return `${formattedDate}(${dayOfWeek}) ${isLateNight}${time}`;
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime
        onChange={(value, dateString) => {
          console.log('Selected Time: ', dateString);
          console.log('Formatted Selected Time: ', formatJapaneseDate(dayjs(value))); // Format theo kiểu Nhật Bản
        }}
        onOk={(value) => {
          console.log('onOk: ', formatJapaneseDate(dayjs(value))); // Format khi chọn thời gian
        }}
      />
    </Space>
  );
};

export default AppDatePickerTime;
