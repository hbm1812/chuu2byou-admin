import React, { useEffect, useState } from 'react'
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';
import AppSelected from '../../../../components/common/AppSelected';
import { IAddMenu, ITableMenu } from '../../interfaces/typeMenu';
import { ITableMenuType } from '../../interfaces/typeMenuType';
import { useDispatch } from 'react-redux';
import useRefresh from '../../../../hooks/useRefresh';
import { startLoading, stopLoading } from '../../../../redux/reducers/loadingReducer';
import { getAllMenuTypeNoParam } from '../../api/menuType.api';
import { showNotification } from '../../../../redux/reducers/notificationReducer';

type Props = {
    title?: string;
    onSubmit: (values: IAddMenu) => Promise<void>;
    form: FormInstance<IAddMenu>;
    dataMenu: ITableMenu | undefined;
    modalType?: string;
    menuCode: string[];
}

const ModalMenu: React.FC<Props> = ({
    title,
    form,
    onSubmit,
    dataMenu,
    modalType,
    menuCode,
}) => {
    const [isDisable, setIsDisable] = useState(false);
    const [dataMenuType, setDataMenuType] = useState<ITableMenuType[]>([]);
    const dispatch = useDispatch();
    const [refresh, refetch] = useRefresh();

    useEffect(() => {
        if (modalType === "add") {
            setIsDisable(false);
        }
        if (dataMenu && modalType === "edit") {
            form.setFieldsValue(dataMenu);
            setIsDisable(false);
        }
        if (dataMenu && modalType === "detail") {
            form.setFieldsValue(dataMenu);
            setIsDisable(true);
        }
    }, [dataMenu, modalType]);

    const validateProductCode = (_: any, value: string) => {
        if ((modalType === "edit" && value !== dataMenu?.code && menuCode.includes(value)) || (modalType === "add" && menuCode.includes(value))) {
            return Promise.reject(new Error("The code already exists"));
        }
        return Promise.resolve();
    };


    const getListMenuTypeNoPamam = async () => {
        dispatch(startLoading());
        try {
            const response = await getAllMenuTypeNoParam();
            if (response.status) {
                setDataMenuType(response.result);
            }
        } catch (error) {
            dispatch(
                showNotification({
                    message: "Lấy dữ liệu thất bại!",
                    type: "error",
                })
            );
        } finally {
            dispatch(stopLoading());
        }
    };

    useEffect(() => {
        getListMenuTypeNoPamam();
    }, [refresh]);
    
    return (
        <div className="form_qlvt">
            <Form
                form={form}
                layout="vertical"
                name="Menu"
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

                    <Form.Item label="Menu type code" name="menuTypeCode" >
                        <AppSelected
                          options={dataMenuType.map((item) => ({
                            value: item.menuTypeCode,
                            label: item.menuTypeName,
                        }))}
                        showSearch
                        placeholder={isDisable ? "" : "Select menu type"}
                        filterByLabel
                        disableWithSelected={isDisable}
                          />
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

export default ModalMenu