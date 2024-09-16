import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormInstance, Upload, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AppInput from '../../../../components/common/AppInput';
import { IInsertNews, INewsTable } from '../../interfaces/TypeNews';
import AppDatePicker from '../../../../components/common/AppDatePicker';
import AppTextArea from '../../../../components/common/AppTextArea';
import AppModal from '../../../../components/common/AppModal';
import { ISearchNewsType } from '../../interfaces/TypeNewsType';
import MListNewsType from './MListNewsType';
import { uploadFileToGoogleDrive } from '../../../../utils/googleDriveService'; // Service để upload file lên Google Drive
import axios from 'axios';

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

    useEffect(() => {
        if (modalType === "add") {
            setIsDisable(false);
        }
        if (news && modalType === "edit") {
            form.setFieldsValue(news);
            setIsDisable(false);
            setThumbnailUrl(news.thumbnail); // Load thumbnail khi edit
        }
        if (news && modalType === "detail") {
            form.setFieldsValue(news);
            setIsDisable(true);
            setThumbnailUrl(news.thumbnail);
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
    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Gọi API backend để upload ảnh lên Cloudinary
            const response = await axios.post('http://localhost:1812/api/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { url } = response.data; // Nhận URL ảnh từ API
            setThumbnailUrl(url); // Hiển thị ảnh đã upload
            form.setFieldsValue({ thumbnail: url }); // Gán giá trị URL ảnh vào form
            message.success('Upload thành công!');
        } catch (error) {
            message.error('Upload thất bại!');
        }
    };

    const uploadProps = {
        beforeUpload: (file: File) => {
            handleUpload(file);
            return false; // Prevent automatic upload by Ant Design
        },
        showUploadList: false, // Không hiển thị danh sách upload
    };

    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="News"
                onFinish={(values) => onSubmit(values)}
                autoComplete="off"
            >
                <Form.Item label="title" name="title" rules={[
                    { required: !isDisable, message: 'コードを入力してください' },
                    {
                        pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
                        message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます。",
                    },
                ]}>
                    <AppInput disableWithPopup={isDisable} />
                </Form.Item>

                <div className="modal_form_container_3_row">
                    <Form.Item label="newsCode" name="newsCode" rules={[
                        { required: !isDisable, message: 'コードを入力してください' },
                        {
                            pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
                            message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます。",
                        },
                        {
                            validator: validateProductCode
                        },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="typeCode" name="typeCodeName" rules={[
                        { required: true, message: 'コードを入力してください' },
                    ]}>
                        <div>
                            <AppInput
                                placeholder={modalType === "detail" ? " " : "Chọn chủ đầu tư"}
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
                        label="Ngày đăng"
                        name="timelineFrom"
                        rules={[
                            { required: true, message: "Vui lòng nhập ngày thực hiện" },
                        ]}
                    >
                        <AppDatePicker />
                    </Form.Item>
                </div>
                <br />
                <div className="modal_form_container_2_row">
                    <Form.Item label="Thumbnail" name="thumbnail">
                        <Upload {...uploadProps}>
                            <UploadOutlined /> Click để upload ảnh
                        </Upload>
                        {thumbnailUrl && <Image src={thumbnailUrl} alt="Thumbnail" style={{ marginTop: 10, width: 200 }} />}
                    </Form.Item>

                    <Form.Item label="image" name="image">
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>
                </div>



                <Form.Item label="content" name="content" rules={[
                    { required: !isDisable, message: 'コードを入力してください' },
                ]}>
                    <AppTextArea autoSize={{ minRows: 6 }} readOnly={isDisable} />
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
