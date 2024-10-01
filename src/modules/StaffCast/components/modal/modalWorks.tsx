import React, { useEffect, useState } from 'react'

import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';
import { IAddWorks, ITableWorks } from '../../interfaces/TypeWorks';
import AppTextArea from '../../../../components/common/AppTextArea';

type Props = {
  title?: string;
  onSubmit: (values: IAddWorks) => Promise<void>;
  form: FormInstance<IAddWorks>;
  workData: ITableWorks | undefined;
  modalType?: string;
  workCode: string[];
};

const ModalWork: React.FC<Props> = ({
  title,
  form,
  onSubmit,
  workData,
  modalType,
  workCode,
}) => {
  const [isDisable, setIsDisable] = useState(false);



  useEffect(() => {
    if (modalType === "add") {
      setIsDisable(false);
    }
    if (workData && modalType === "edit") {
      form.setFieldsValue(workData);
      setIsDisable(false);
    }
    if (workData && modalType === "detail") {
      form.setFieldsValue(workData);
      setIsDisable(true);
    }
  }, [workData, modalType]);


  const validateProductCode = (_: any, value: string) => {
    if ((modalType === "edit" && value !== workData?.workCode && workCode.includes(value)) || (modalType === "add" && workCode.includes(value))) {
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
        <div className="modal_form_container_2_row">
          <Form.Item label="Work code" name="workCode" rules={[
            { required: !isDisable, message: 'Please enter work code' },
            
            {
              validator: validateProductCode
            },
          ]}>
            <AppInput disableWithPopup={isDisable} />
          </Form.Item>

          <Form.Item label="Work name" name="workName" rules={[
            { required: !isDisable, message: 'please enter work name' },
           
          ]}>
            <AppInput disableWithPopup={isDisable} />
          </Form.Item>

         

        </div>
        <br />
        <Form.Item
              label="description"
              name="description"
            >
              <AppTextArea
                maxLength={250}
                rows={10}
                style={{ borderColor: "#1b366e" }}
                readOnly={isDisable}
              />
            </Form.Item>
      </Form>
    </div>
  );
};

export default ModalWork;