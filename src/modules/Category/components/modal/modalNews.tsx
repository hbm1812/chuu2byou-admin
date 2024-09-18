import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormInstance, Upload, message, Image, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AppInput from '../../../../components/common/AppInput';
import { IInsertNews, INewsTable } from '../../interfaces/TypeNews';
import AppDatePicker from '../../../../components/common/AppDatePicker';
import AppTextArea from '../../../../components/common/AppTextArea';
import AppModal from '../../../../components/common/AppModal';
import { ISearchNewsType } from '../../interfaces/TypeNewsType';
import MListNewsType from './MListNewsType';
import axios from 'axios';
import RichTextEditor from '../../../../components/common/RichTextEditor';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';


dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('ja'); // Đặt locale là Nhật Bản

type Props = {
    title?: string;
    onSubmit: (values: IInsertNews) => Promise<void>;
    form: FormInstance<IInsertNews>;
    news: INewsTable | undefined;
    modalType?: string;
    newsCode: string[];
    newsType: { id: string; name: string } | null;
    setNewsType: React.Dispatch<React.SetStateAction<{ id: string; name: string } | null>>;
};

const ModalNews: React.FC<Props> = ({
    title,
    form,
    onSubmit,
    news,
    modalType,
    newsCode,
    newsType,
    setNewsType,
}) => {
    const [isDisable, setIsDisable] = useState(false);
    const [openModalAddInput, setOpenModalAddInput] = useState<boolean>(false);
    const [typeOpenModalAddInput, setTypeOpenModalAddInput] = useState<string>("newsType");
    const [formListNewsType] = Form.useForm<ISearchNewsType>();
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

    const [content, setContent] = useState(news?.content || '');

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
        if (news && (modalType === "edit" || modalType === "detail")) {
            form.setFieldsValue({
                ...news,
                upLoadDate: parseJapaneseDate(news.upLoadDate), // Set formatted broadcast time
            });
            setIsDisable(modalType === "detail");
            // setThumbnailUrl(news.thumbnail); // Load thumbnail khi edit
            setContent(news.content || '');
        }

    }, [news, modalType]);

    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== news?.newsCode && newsCode.includes(value)) || (modalType === "add" && newsCode.includes(value))) {
            return Promise.reject(new Error("コードは既に存在します。"));
        }
        return Promise.resolve();
    };

    const showModalNewsType = () => {
        setTypeOpenModalAddInput("newsType");
        setOpenModalAddInput(modalType === "detail" ? false : true);
    };

    const onCloseNewsType = () => {
        setOpenModalAddInput(false);
        typeOpenModalAddInput === "newsType" && setNewsType(null);
        formListNewsType.resetFields();
    };

    const onSubmitNewsType = () => {
        setOpenModalAddInput(false);
        form.setFieldsValue({
            typeCode: newsType?.id,
        });
    };

    // Function to handle file upload to Cloudinary
    // const handleUpload = async (file: File) => {
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         // Gọi API backend để upload ảnh lên Cloudinary
    //         const response = await axios.post('http://localhost:1812/api/upload/image', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         const { url } = response.data; // Nhận URL ảnh từ API
    //         setThumbnailUrl(url); // Hiển thị ảnh đã upload
    //         form.setFieldsValue({ thumbnail: url }); // Gán giá trị URL ảnh vào form
    //         message.success('Upload thành công!');
    //     } catch (error) {
    //         message.error('Upload thất bại!');
    //     }
    // };

    // const uploadProps = {
    //     beforeUpload: (file: File) => {
    //         handleUpload(file);
    //         return false; // Prevent automatic upload by Ant Design
    //     },
    //     showUploadList: false, // Không hiển thị danh sách upload
    // };

 // Lắng nghe sự thay đổi của title và typeCodeName để cập nhật newsCode
 useEffect(() => {
    const titleValue = form.getFieldValue('title');
    const typeCodeName = form.getFieldValue('typeCode');

    if (titleValue && typeCodeName) {
        const halfTitle = titleValue.slice(0, Math.floor(titleValue.length / 2)); // Lấy nửa đầu của title
        const generatedNewsCode = `news_${typeCodeName}_${halfTitle}`;

        // Cập nhật giá trị của newsCode
        form.setFieldsValue({
            newsCode: generatedNewsCode,
        });
    }
}, [form, form.getFieldValue('title'), form.getFieldValue('typeCodeName')]);

    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="News"
                onFinish={(values) => onSubmit({ ...values, content })}
                autoComplete="off"
            >
                <Form.Item label="title" name="title" rules={[
                    { required: !isDisable, message: 'コードを入力してください' },
                    {
                        pattern: /^[a-zA-Z0-9-_.{}[\]"'!;:~！？。、【】『』「」（）《》〈〉｛｝・／￥＠＃％＆＊\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
                        message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます。",
                    },
                ]}>
                    <AppInput disableWithPopup={isDisable} />
                </Form.Item>

                <div className="modal_form_container_3_row">
                    <Form.Item label="newsCode" name="newsCode" rules={[
                        { required: !isDisable, message: 'コードを入力してください' },
                        
                        {
                            validator: validateProductCode
                        },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="タイプコード" name="typeCode" rules={[
                        { required: true, message: 'タイプコードを入力してください' },
                    ]}>
                        <div>
                            <AppInput
                                placeholder={modalType === "detail" ? " " : "タイプコードを入力してください"}
                                widthAppInput={"100%"}
                                readOnly
                                onClick={showModalNewsType}
                                value={newsType?.name || ""}
                                disableWithPopup={isDisable}
                            />
                            <input
                                type="hidden"
                                value={newsType?.id || ""}
                                name="typeCode"
                            />
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="アップロード日"
                        name="upLoadDate"
                        rules={[
                            { required: true, message: "アップロード日を入力してください" },
                        ]}
                    >
                        <DatePicker
                            showTime
                            disabled={isDisable} // Disable DatePicker if needed
                        />
                    </Form.Item>
                </div>
                <br />

                <Form.Item label="Thumbnail" name="thumbnail"  rules={[
                    { required: !isDisable, message: 'thumbnailを入力してください' },
                ]}>
                    <AppInput disableWithPopup={isDisable} />
                </Form.Item>

                <Form.Item label="content" name="content" rules={[
                    { required: !isDisable, message: 'コードを入力してください' },
                ]}>
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        isReadOnly={isDisable}
                    />
                </Form.Item>

                <AppModal
                    width={"80%"}
                    onSubmit={onSubmitNewsType}
                    onClose={onCloseNewsType}
                    isOpen={openModalAddInput}
                    title="ニュースタイプ一覧"
                    typeOpenModal={typeOpenModalAddInput}
                >
                    {typeOpenModalAddInput === "newsType" && (
                        <MListNewsType
                            newsType={newsType}
                            setNewsType={setNewsType}
                            formListNewsType={formListNewsType}
                            typeSearch={"add"}
                        />
                    )}
                </AppModal>
            </Form>
        </div>
    );
};

export default ModalNews;
