import React, { useEffect, useState } from "react";
import AppInput from "../../../../components/common/AppInput";
import AppButton from "../../../../components/common/AppButton";
import { Form } from "antd";

interface ICoreInputForm {
  name: string;
  age: number | string;
  location: string;
}

const InputCore: React.FC = () => {
  const [form] = Form.useForm<ICoreInputForm>();

  const [testText1, setTestText1] = useState<string>("");
  const [validate1, setValidate1] = useState<boolean>(false);

  const [checkText2, setCheckText2] = useState<string>("");
  const [error1, setError1] = useState<string>("");
  const [validate2, setValidate2] = useState<boolean>(false);

  const dataDetail = {
    name: "testText1",
    age: 13,
    location: "Hanoi",
  };

  const handleValidate = () => {
    setValidate1(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestText1(e.target.value);
    if (e.target.value) {
      setValidate1(false);
    }
  };

  const handleValidate2 = () => {
    if (checkText2.length < 6) {
      setError1("Cần nhập tối thiểu 6 ký tự!");
      setValidate2(true);
    } else {
      setError1("");
      setValidate2(false);
    }
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckText2(e.target.value);
    if (e.target.value && e.target.value.length >= 6) {
      setValidate2(false);
      setError1("");
    }
  };

  // Hiển thị thông tin các trường lên form
  useEffect(() => {
    if (dataDetail && dataDetail) {
      form.setFieldsValue({
        name: dataDetail.name,
        age: dataDetail.age,
        location: dataDetail.location,
      });
    }

    //Nếu hiển thị chi tiết trong modal thì bắt thêm điều kiển open hoặc title
  }, [dataDetail, form]);

  const onFinish = async (values: ICoreInputForm) => {
    form.resetFields();
  };
  return (
    <div className="column">
      <h3>Input</h3>
      <div className="column-item">
        <h4>Check trống</h4>
        <AppInput
          widthAppInput="50%"
          title="Nhập chữ"
          required
          placeholder="Nhập chữ bất kỳ"
          value={testText1}
          onChange={handleChange}
          validate={validate1}
        />
        <AppButton
          title="Check valid không trong form"
          className="default_btn_search"
          onClick={handleValidate}
        />
      </div>

      <div className="column-item">
        <h4>Check có điều kiện</h4>
        <AppInput
          widthAppInput="50%"
          title="Nhập chữ"
          required
          placeholder="Nhập chữ bất kỳ"
          value={checkText2}
          onChange={handleChange2}
          validate={validate2}
          error={error1}
        />
        <AppButton
          title="Check valid không trong form"
          className="default_btn_search"
          onClick={handleValidate2}
        />
      </div>
      <div className="column-item">
        <h4>Form input</h4>
        <Form
          form={form}
          layout="vertical"
          name="CoreUser1"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên !" }]}
          >
            <AppInput widthAppInput="50%" placeholder="Nhập chữ bất kỳ" />
          </Form.Item>
          <Form.Item
            label="Tuổi"
            name="age"
            rules={[{ required: true, message: "Vui lòng nhập tuổi !" }]}
          >
            <AppInput widthAppInput="50%" placeholder="Nhập tuổi" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="location"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ !" }]}
          >
            <AppInput widthAppInput="50%" placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default InputCore;
