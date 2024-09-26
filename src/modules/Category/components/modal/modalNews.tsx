import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormInstance, Upload, message, Image, DatePicker, GetProp, UploadProps, UploadFile, Button, Radio } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import AppInput from '../../../../components/common/AppInput';
import { IInsertNews, INewsTable } from '../../interfaces/TypeNews';
import AppModal from '../../../../components/common/AppModal';
import { ISearchNewsType } from '../../interfaces/TypeNewsType';
import MListNewsType from './MListNewsType';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import TextEditor from '../../../../components/common/AppTextEditor';


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
    thumbnailUrl?: string | null;
    setThumbnailUrl: Dispatch<SetStateAction<string>>
    fileList?: UploadFile<any>[];
    setFileList: Dispatch<SetStateAction<UploadFile<any>[]>>;
    content?: string | number;
    setContent?: Dispatch<SetStateAction<string>>
    titleImageUrl?: string | null;
    setTitleImageUrl: Dispatch<SetStateAction<string>>
    // titleImageList?: UploadFile<any>[];
    // setTitleImageList: Dispatch<SetStateAction<UploadFile<any>[]>>;
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
    thumbnailUrl,
    setThumbnailUrl,
    fileList,
    setFileList,
    content,
    setContent,
    titleImageUrl,
    setTitleImageUrl,
    // titleImageList,
    // setTitleImageList
}) => {
    const [isDisable, setIsDisable] = useState(false);
    const [openModalAddInput, setOpenModalAddInput] = useState<boolean>(false);
    const [typeOpenModalAddInput, setTypeOpenModalAddInput] = useState<string>("newsType");
    const [formListNewsType] = Form.useForm<ISearchNewsType>();

    // const [content, setContent] = useState(news?.content || '');

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // const [uploadImage, setUploadImage] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            const file = newFileList[0]; // Lấy file đầu tiên (vì chỉ upload 1 ảnh)
            let imageUrl = file.url || file.thumbUrl;

            // Nếu không có URL hoặc thumbUrl, lấy base64 từ file
            if (!imageUrl && file.originFileObj) {
                imageUrl = await getBase64(file.originFileObj); // Lấy base64 của file
            }

            setThumbnailUrl(imageUrl); // Cập nhật URL ảnh hiển thị
            form.setFieldsValue({ thumbnail: imageUrl }); // Cập nhật giá trị của trường thumbnail trong form
        } else {
            // Xóa giá trị thumbnail nếu không có ảnh nào được chọn
            setThumbnailUrl(null);
            form.setFieldsValue({ thumbnail: null });
        }
    };


    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
            setContent('');
            setIsDisable(false);
            form.setFieldsValue({
                upLoadDate: dayjs(), // Đặt giá trị mặc định là thời gian hiện tại
            });
        }
        if (news && (modalType === "edit" || modalType === "detail")) {
            form.setFieldsValue({
                ...news,
                upLoadDate: parseJapaneseDate(news.upLoadDate), // Set formatted broadcast time
            });
            setIsDisable(modalType === "detail");
            // setThumbnailUrl(news.thumbnail); // Load thumbnail khi edit
            setThumbnailUrl(news.thumbnail);
            setTitleImageUrl(news.titleImage);
            setContent(news.content || '');
            if (news.thumbnail) {
                const fileFromUrl = {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: news.thumbnail, // URL của ảnh
                };
                setFileList([fileFromUrl]); // Set fileList để hiển thị ảnh
            }
        }

    }, [news, modalType]);


    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== news?.newsCode && newsCode.includes(value)) || (modalType === "add" && newsCode.includes(value))) {
            return Promise.reject(new Error("The code already exists"));
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
    }, [form, form.getFieldValue('title'), form.getFieldValue('typeCode')]);



    const handleImageChange = (e: any) => {
        setTitleImageUrl(e.target.value);
        form.setFieldsValue({ titleImage: e.target.value });
    };


    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="News"
                onFinish={(values) => onSubmit({ ...values })}
                autoComplete="off"

            >




                <div className="modal_form_container_2_row_special">
                    <Form.Item label="Title image" name="titleImage" rules={[
                        { required: true, message: "Title iamge cannot be empty" },
                    ]}>
                        <Radio.Group onChange={handleImageChange} value={titleImageUrl}>
                            <div style={{ display: 'grid', gridTemplateColumns: ' repeat(2, 1fr)', gap: '5px' }}>
                                <Radio value="../../../../../dist/titleImage1.jpg">
                                    <Image
                                        width={100}
                                        height={100}
                                        src="../../../../../dist/titleImage1.jpg"
                                        preview={false}
                                    />
                                </Radio>
                                <Radio value="../../../../../dist/titleImage2.jpg">
                                    <Image
                                        width={100}
                                        height={100}
                                        src="../../../../../dist/titleImage2.jpg"
                                        preview={false}
                                    />
                                </Radio>
                                <Radio value="../../../../../dist/titleImage3.jpg">
                                    <Image
                                        width={100}
                                        height={100}
                                        src="../../../../../dist/titleImage3.jpg"
                                        preview={false}
                                    />
                                </Radio>
                                <Radio value="../../../../../dist/titleImage4.jpg">
                                    <Image
                                        width={100}
                                        height={100}
                                        src="../../../../../dist/titleImage4.jpg"
                                        preview={false}
                                    />
                                </Radio>
                            </div>
                        </Radio.Group>

                    </Form.Item>
                    <div>

                        <Form.Item label="Title" name="title" rules={[
                            { required: !isDisable, message: 'Title cannot be empty' },
                            // {
                            //     pattern: /^[a-zA-Z0-9-_.{}[\]"'!;:~！？。、【】『』「」（）《》〈〉｛｝・／￥＠＃％＆＊\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
                            //     message: "Only letters, numbers, dashes, underscores, periods, and Japanese characters are allowed.",
                            // },
                        ]}>
                            <AppInput disableWithPopup={isDisable} />
                        </Form.Item>
                        <br />
                        <div className='modal_form_container_4_row'>
                            <Form.Item label="Thumbnail" name="thumbnail">
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    maxCount={1}
                                    className="custom-upload"
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Code" name="newsCode" rules={[
                        { required: !isDisable, message: 'Code cannot be empty' },

                        {
                            validator: validateProductCode
                        },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="News type" name="typeCode" rules={[
                        { required: true, message: 'News type cannot be empty' },
                    ]}>
                        <AppInput
                            placeholder={modalType === "detail" ? " " : "Please enter news type"}
                            widthAppInput={"100%"}
                            readOnly
                            onClick={showModalNewsType}
                            value={newsType?.name || ""}
                            disableWithPopup={isDisable}
                            name='typeCode'
                        />
                        {/* <input
                                type="hidden"
                                value={newsType?.id || ""}
                                name="typeCode"
                            /> */}
                    </Form.Item>

                    <Form.Item
                        label="Upload time"
                        name="upLoadDate"
                        rules={[
                            { required: true, message: "Upload time cannot be empty" },
                        ]}
                    >
                        <DatePicker
                            showTime
                            disabled={isDisable} // Disable DatePicker if needed
                        />
                    </Form.Item>

                        </div>

                    </div>
                  
                </div>

                <Form.Item label="Content" name="content" rules={[
                    { required: !isDisable, message: 'Content cannot be empty' },
                ]}>
                    <TextEditor
                        value={content }
                        onChange={setContent}
                        isReadOnly={isDisable}
                    />
                </Form.Item>

                <AppModal
                    width={"80%"}
                    onSubmit={onSubmitNewsType}
                    onClose={onCloseNewsType}
                    isOpen={openModalAddInput}
                    title="News type list"
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
