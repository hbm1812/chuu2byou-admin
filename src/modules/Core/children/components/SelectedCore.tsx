import React, { useState } from "react";
import AppButton from "../../../../components/common/AppButton";
import AppSelected from "../../../../components/common/AppSelected";

const SelectedCore: React.FC = () => {
  const [validate1, setValidate1] = useState<boolean>(false);
  const [validate2, setValidate2] = useState<boolean>(false);
  const [selectedValue1, setSelectedValue1] = useState<string | undefined>();
  const [selectedValue2, setSelectedValue2] = useState<string | undefined>();
  const [error2, setError2] = useState<string>("");

  const handleValidate1 = () => {
    setValidate1(true);
  };

  const handleValidate2 = () => {
    if (selectedValue2 === "option1") {
      setError2("Không thể chọn Option 1");
      setValidate2(true);
    } else {
      setError2("");
      setValidate2(false);
    }
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
    { value: "option6", label: "Option 6" },
    { value: "option7", label: "Option 7" },
  ];

  const onChange1 = (value: any) => {
    setSelectedValue1(value);
  };

  const onChange2 = (value: any) => {
    setSelectedValue2(value);
  };

  return (
    <div className="column">
      <h3>Selected</h3>
      <div className="column-item">
        <h4>Check trống</h4>
        <AppSelected
          widthAppSelected="50%"
          title="Chọn giá trị"
          required
          placeholder="Chọn giá trị"
          value={selectedValue1}
          validate={validate1}
          onChange={onChange1}
          options={options}
        />
        <AppButton
          title="Check valid không trong form"
          className="default_btn_search"
          onClick={handleValidate1}
        />
      </div>

      <div className="column-item">
        <h4>Check có điều kiện</h4>
        <AppSelected
          widthAppSelected="50%"
          title="Chọn giá trị"
          required
          placeholder="Chọn giá trị"
          value={selectedValue2}
          validate={validate2}
          onChange={onChange2}
          error={error2}
          options={options}
          showSearch
          filterByLabel
        />
        <AppButton
          title="Check valid không trong form"
          className="default_btn_search"
          onClick={handleValidate2}
        />
      </div>
      <div className="column-item">
        <h4>Form Selected</h4>
        <p>Tương tự input vì chung cấu trúc form của antd</p>
      </div>
      <div className="column-item">
        {/* <h4>Selected danh mục, có truyền id</h4> */}
      </div>
    </div>
  );
};

export default SelectedCore;
