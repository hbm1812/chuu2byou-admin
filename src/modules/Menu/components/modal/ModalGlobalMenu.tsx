import React, { useEffect, useState } from 'react'
import { IAddGlobalMenu, ITableGlobalMenu } from '../../interfaces/typeGlobalMenu';
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';
import AppSelected from '../../../../components/common/AppSelected';

type Props = {
    title?: string;
    onSubmit: (values: IAddGlobalMenu) => Promise<void>;
    form: FormInstance<IAddGlobalMenu>;
    dataGlobalMenu: ITableGlobalMenu | undefined;
    modalType?: string;
    globalMenuCode: string[];
}

const ModalGlobalMenu: React.FC<Props> = ({
    title,
    form,
    onSubmit,
    dataGlobalMenu,
    modalType,
    globalMenuCode,
}) => {
    const [isDisable, setIsDisable] = useState(false);
    useEffect(() => {
        if (modalType === "add") {
            setIsDisable(false);
        }
        if (dataGlobalMenu && modalType === "edit") {
            form.setFieldsValue(dataGlobalMenu);
            setIsDisable(false);
        }
        if (dataGlobalMenu && modalType === "detail") {
            form.setFieldsValue(dataGlobalMenu);
            setIsDisable(true);
        }
    }, [dataGlobalMenu, modalType]);

    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== dataGlobalMenu?.code && globalMenuCode.includes(value)) || (modalType === "add" && globalMenuCode.includes(value))) {
            return Promise.reject(new Error("The code already exists"));
        }
        return Promise.resolve();
    };

    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="NewsType"
                onFinish={(values) => onSubmit(values)}
                autoComplete="off"
            >
                <div className="modal_form_container_3_row">
                    <Form.Item label="Key" name="key" rules={[
                        { required: !isDisable, message: 'Code is required' },
                        
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Code" name="code" rules={[
                        { required: !isDisable, message: 'Code is required' },
                        {
                            validator: validateProductCode
                        },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Name" name="name" rules={[
                        { required: !isDisable, message: 'Code is required' },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Parent code" name="parentCode" >
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Path" name="path" rules={[
                        { required: !isDisable, message: 'Code is required' },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Icon" name="icon" >
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Landing" name="landing" >
                        <AppSelected
                         options={[
                            { value: 0, label: "Chuyển trang" },
                            { value: 1, label: "Nhảy vị trí" },
                          ]}
                         disabled={isDisable}
                          />
                    </Form.Item>


                    <Form.Item label="ShowMenu" name="showMenu" >
                        <AppSelected
                         options={[
                            { value: 0, label: "no" },
                            { value: 1, label: "yes" },
                          ]}
                         disabled={isDisable}
                          />
                    </Form.Item>




                </div>
            </Form>
        </div>
    )
}

export default ModalGlobalMenu