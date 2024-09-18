import React, { useEffect, useState } from 'react'
import { DatePicker, Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';
import { IAddTV, ITableTV } from '../../interfaces/TypeTV';
import AppTextArea from '../../../../components/common/AppTextArea';
import moment from 'moment'; // Import moment to handle date parsing
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';


dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('ja'); // Đặt locale là Nhật Bản
type Props = {
    title?: string;
    onSubmit: (values: IAddTV) => Promise<void>;
    form: FormInstance<IAddTV>;
    tv: ITableTV | undefined;
    modalType?: string;
    tvCode: string[];
};

const ModalTV: React.FC<Props> = ({
    title,
    form,
    onSubmit,
    tv,
    modalType,
    tvCode,
}) => {
    const [isDisable, setIsDisable] = useState(false);

    // Hàm chuyển đổi chuỗi kiểu Nhật Bản về định dạng DatePicker
    const parseJapaneseDate = (dateString: string): dayjs.Dayjs | null => {
        // Regex để tách ngày, tháng, năm, giờ, phút và xác định 深夜
        const regex = /(\d+)月(\d+)日\((.)\)\s*(深夜)?(\d+)時(\d+)分/;
        const match = dateString.match(regex);

        if (match) {
            const [, month, day, dayOfWeek, lateNight, hour, minute] = match;

            // Tạo ngày giờ dựa vào các thành phần
            const formattedDate = `2024-${month}-${day} ${hour}:${minute}`; // Thay năm '2024' nếu cần

            // Tạo đối tượng dayjs từ chuỗi ngày giờ
            return dayjs(formattedDate, 'YYYY-MM-DD HH:mm');
        }

        return null; // Trả về null nếu không khớp với định dạng
    };


    useEffect(() => {
        if (modalType === "add") {
            setIsDisable(false);
        }
        if (tv && (modalType === "edit" || modalType === "detail")) {


            form.setFieldsValue({
                ...tv,
                broadcastTime: parseJapaneseDate(tv.broadcastTime), // Set formatted broadcast time
            });
            setIsDisable(modalType === "detail"); // Disable input if modalType is "detail"
        }
    }, [tv, modalType]);

    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== tv?.tvCode && tvCode.includes(value)) || (modalType === "add" && tvCode.includes(value))) {
            return Promise.reject(new Error("コードは既に存在します。"));
        }
        return Promise.resolve();
    };

    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="TV"
                onFinish={(values) => onSubmit(values)}
                autoComplete="off"
            >
                <div className="modal_form_container_3_row">
                    <Form.Item
                        label="テレビコード"
                        name="tvCode"
                        rules={[
                            { required: !isDisable, message: 'テレビコードドを入力してください' },
                            {
                                pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
                                message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます。",
                            },
                            {
                                validator: validateProductCode
                            },
                        ]}
                    >
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item
                        label="テレビ名"
                        name="tvName"
                        rules={[
                            { required: !isDisable, message: 'テレビ名を入力してください' },
                            {
                                pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/,
                                message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます。",
                            },
                        ]}
                    >
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item
                        label="Broadcast time"
                        name="broadcastTime"
                    >
                        <DatePicker
                            showTime
                            disabled={isDisable} // Disable DatePicker if needed
                        />
                    </Form.Item>
                </div>
                
               <br />
                <Form.Item
                    label="説明"
                    name="description"
                    rules={[
                        {
                            pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/,
                            message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます。",
                        },
                    ]}
                >
                    {/* <AppTextArea autoSize={{ minRows: 4 }} readOnly={isDisable} /> */}
                    <AppInput disableWithPopup={isDisable} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ModalTV;
