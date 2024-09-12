import React, { useEffect, useState } from 'react'
import { IAddNewsType, ITable } from '../../interfaces/TypeNewsType';
import { Form, FormInstance } from 'antd';
import AppInput from '../../../../components/common/AppInput';

type Props = {
  title?: string;
  onSubmit: (values: IAddNewsType) => Promise<void>;
  form: FormInstance<IAddNewsType>;
  newsType: ITable | undefined;
  modalType?: string;
  newsTypeCode: string[];
};

const ModalNewsType: React.FC<Props> = ({
  title,
  form,
  onSubmit,
  newsType,
  modalType,
  newsTypeCode,
}) => {
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (modalType === "add") {
      setIsDisable(false);
    }
    // if (newsType && modalType === "edit") {
    //   form.setFieldsValue(newsType);
    //   setIsDisable(false);
    // }
    // if (newsType && modalType === "detail") {
    //   form.setFieldsValue(newsType);
    //   setIsDisable(true);
    // }
  }, [newsType, modalType]);


  const validateProductCode = (_: any, value: string) => {
    if ((modalType === "edit" && value !== newsType?.typeCode && newsTypeCode.includes(value)) || (modalType === "add" && newsTypeCode.includes(value))) {
      return Promise.reject(new Error("Mã nội bộ đã tồn tại!"));
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
          <Form.Item label="コード" name="typeCode" rules={[
            { required: !isDisable, message: 'コードを入力してください' },
            {
              pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
              message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます",
            },
            {
              validator: validateProductCode
            },
          ]}>
            <AppInput disableWithPopup={isDisable} />
          </Form.Item>

          <Form.Item label="ニュースタイプ" name="typeNameJP" rules={[
            { required: !isDisable, message: 'ニュースタイプを入力してください' },
            {
              pattern: /^[a-zA-Z0-9-_.\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/,
              message: "文字、数字、ダッシュ、アンダースコア、ピリオド、日本語文字のみが使用できます",
            },
          ]}>
            <AppInput disableWithPopup={isDisable} />
          </Form.Item>


        </div>
      </Form>
    </div>
  );
};

export default ModalNewsType;