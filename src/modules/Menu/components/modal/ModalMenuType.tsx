import React, { useEffect, useState } from 'react'
import { IAddMenuType, ITableMenuType } from '../../interfaces/typeMenuType';
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';

type Props = {
    title?: string;
    onSubmit: (values: IAddMenuType) => Promise<void>;
    form: FormInstance<IAddMenuType>;
    dataMenuType: ITableMenuType | undefined;
    modalType?: string;
    menuTypeCode: string[];
}

const ModalMenuType: React.FC<Props> = ({
    title,
    form,
    onSubmit,
    dataMenuType,
    modalType,
    menuTypeCode,
}) => {

    const [isDisable, setIsDisable] = useState(false);

    useEffect(() => {
        if (modalType === "add") {
            setIsDisable(false);
        }
        if (dataMenuType && modalType === "edit") {
            form.setFieldsValue(dataMenuType);
            setIsDisable(false);
        }
        if (dataMenuType && modalType === "detail") {
            form.setFieldsValue(dataMenuType);
            setIsDisable(true);
        }
    }, [dataMenuType, modalType]);

    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== dataMenuType?.menuTypeCode && menuTypeCode.includes(value)) || (modalType === "add" && menuTypeCode.includes(value))) {
            return Promise.reject(new Error("The code already exists"));
        }
        return Promise.resolve();
    };

    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="MenuType"
                onFinish={(values) => onSubmit(values)}
                autoComplete="off"
            >
                <div className="modal_form_container_2_row">
                    <Form.Item label="Code" name="menuTypeCode" rules={[
                        { required: !isDisable, message: 'Code is required' },
                        {
                            validator: validateProductCode
                        },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>

                    <Form.Item label="Type name" name="menuTypeName" rules={[
                        { required: !isDisable, message: 'Name is required' },
                    ]}>
                        <AppInput disableWithPopup={isDisable} />
                    </Form.Item>


                </div>
            </Form>
        </div>
    )
}

export default ModalMenuType