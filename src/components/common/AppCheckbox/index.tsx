import { Checkbox } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";

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
  layout?: string;
};
const AppCheckbox: React.FC<Props & React.ComponentProps<typeof Checkbox>> = ({
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
  layout,
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
      className={classNames("appCheckbox_main", classNameAppInput)}
    >
      {title && layout === "vertical" && (
        <div style={titleStyle}>
          <span>{title && required ? "*" : null}</span> {title}
        </div>
      )}
      <Checkbox
        {...restProps}
        style={combinedStyleInput}
        className={classNames("checkbox_main", classNameInput)}
        value={value}
      >
        {layout === "horizontal" && title}
      </Checkbox>
      {required && (
        <div className="text_error">{required && internalError}</div>
      )}
    </div>
  );
};
export default AppCheckbox;
