import React, { useState } from "react";
import moment from "moment";
import AppDatePicker from "../../../../components/common/AppDatePicker";
import { Button, Form } from "antd";

const DatePickerExample: React.FC = () => {
  const [validate, setValidate] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string | undefined>("");
  const [dateValue2, setDateValue2] = useState<string | undefined>("");

  const handleValidate = () => {
    setValidate(true);
  };

  const handleDateChange = (date: string) => {
    setDateValue2(date);
  };
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="column">
      <div>
        <h3>Date Picker Example</h3>
        <div className="column-item">
          <h4>Check trống</h4>
          <AppDatePicker
            // widthAppPicker="50%"
            label="Chọn ngày"
            isRequired
            placeholder="Chọn ngày"
            defaultDate={dateValue}
            handleGetValue={(date) => setDateValue(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <button onClick={handleValidate}>Validate</button>
      </div>
      <div>
        <AppDatePicker
          // widthAppPicker="50%"
          label="Chọn ngày khác"
          isRequired
          placeholder="Chọn ngày"
          defaultDate={dateValue2}
          handleGetValue={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
        <p>
          Date:{" "}
          {dateValue2
            ? moment(dateValue2, "DD/MM/YYYY").format("DD/MM/YYYY")
            : ""}
        </p>
      </div>
      <Form
      form={form}
      name="datePickerForm"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <AppDatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default DatePickerExample;
