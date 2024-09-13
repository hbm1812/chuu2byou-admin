import React, { useEffect, useState } from 'react'
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';
import { IInsertNews, INewsTable } from '../../interfaces/TypeNews';
import AppDatePicker from '../../../../components/common/AppDatePicker';
import AppTextArea from '../../../../components/common/AppTextArea';

type Props = {
    title?: string;
    onSubmit: (values: IInsertNews) => Promise<void>;
    form: FormInstance<IInsertNews>;
    news: INewsTable | undefined;
    modalType?: string;
    newsCode: string[];
};

const ModalNews: React.FC<Props> = ({
    title,
    form,
    onSubmit,
    news,
    modalType,
    newsCode,
}) => {
    const [isDisable, setIsDisable] = useState(false);

    useEffect(() => {
        if (modalType === "add") {
            setIsDisable(false);
        }
        if (news && modalType === "edit") {
            form.setFieldsValue(news);
            setIsDisable(false);
        }
        if (news && modalType === "detail") {
            form.setFieldsValue(news);
            setIsDisable(true);
        }
    }, [news, modalType]);


    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== news?.newsCode && newsCode.includes(value)) || (modalType === "add" && newsCode.includes(value))) {
            return Promise.reject(new Error("コードは既に存在します。"));
        }
        return Promise.resolve();
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

                <div>
                    <div className="modal_form_container_2_row">
                        <div className="modal_form_container_2_row">
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
                            <Form.Item label="typeCode" name="typeCode">
                                <div>
                                    <AppInput
                                        placeholder="Chọn typeCode"
                                        widthAppInput={"100%"}
                                        readOnly
                                        onClick={showModalNewsType}
                                        value={khachHang?.name}
                                        disableWithPopup={isDisable}
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
                                {/* Tự động lấy ngày hôm nay */}
                                <AppDatePicker
                                // isPlaceHolder={state.routeType === "detail" ? false : true}
                                // onChange={handleTimelineChange}
                                // readOnly={state.routeType === "detail"}
                                />
                            </Form.Item>
                        </div>

                        <div>

                            <Form.Item label="thumnail" name="thumnail" rules={[
                                { required: !isDisable, message: 'コードを入力してください' },
                               
                            ]}>
                                <AppInput disableWithPopup={isDisable} />
                            </Form.Item>


                            <Form.Item label="image" name="image" >
                                <AppInput disableWithPopup={isDisable} />
                            </Form.Item>
                        </div>

                    </div>

                    <Form.Item label="content" name="content"  rules={[
                                { required: !isDisable, message: 'コードを入力してください' },
                               
                            ]}>
                        <AppTextArea autoSize={{ minRows: 6 }} readOnly={isDisable} />
                    </Form.Item>

                </div>
            </Form>
        </div>
    );
};

export default ModalNews;