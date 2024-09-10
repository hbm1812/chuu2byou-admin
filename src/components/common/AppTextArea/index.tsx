import React, { useState, useEffect, ReactNode } from "react";
import { Input } from "antd";
import classNames from "classnames";

const { TextArea } = Input;

type Props = {
  styleAppInput?: React.CSSProperties;
  widthAppInput?: number | string;
  styleInput?: React.CSSProperties;
  widthInput?: number | string;
  classNameAppInput?: string;
  classNameInput?: string;
  required?: boolean;
  fontSizeTitle?: number | string;
  title?: string;
  error?: string;
  validate?: boolean;
  inputType?: "text" | "number";
};

const AppTextArea: React.FC<Props & React.ComponentProps<typeof TextArea>> = ({
  styleAppInput,
  widthAppInput,
  styleInput,
  widthInput,
  classNameAppInput,
  classNameInput,
  required,
  fontSizeTitle,
  title,
  error,
  value,
  validate,
  inputType = "text",
  ...restProps
}) => {
  const [internalError, setInternalError] = useState<string | undefined>(error);

  useEffect(() => {
    if (validate && required && !value) {
      setInternalError("Vui lòng không để trống");
    } else {
      setInternalError(error);
    }
  }, [validate, required, value, error]);

  const combinedStyleAppInput = { ...styleAppInput, width: widthAppInput };
  const combinedStyleInput = { ...styleInput, width: widthInput };

  const titleStyle = {
    fontSize: fontSizeTitle ? fontSizeTitle : 15,
    margin: "10px 0px",
  };

  return (
    <div
      style={combinedStyleAppInput}
      className={classNames("appInput_main", classNameAppInput)}
    >
      {title && (
        <div style={titleStyle}>
          <span>{title && required ? "*" : null}</span> {title}
        </div>
      )}
      <TextArea
        {...restProps}
        rows={7}
        style={combinedStyleInput}
        className={classNames("input_main", classNameInput)}
        value={value}
      />

      {required && (
        <div className="text_error">{required && internalError}</div>
      )}
    </div>
  );
};

export default AppTextArea;
