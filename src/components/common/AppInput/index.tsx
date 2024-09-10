import React, { useState, useEffect } from "react";
import { Input } from "antd";
import classNames from "classnames";

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
    disableWithPopup?: boolean;
    disabled?: boolean;
};

const AppInput: React.FC<Props & React.ComponentProps<typeof Input>> = ({
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
    disableWithPopup,
    inputType = "text",
    disabled,
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
            <Input
                {...restProps}
                style={combinedStyleInput}
                className={classNames("input_main", classNameInput, disableWithPopup ? "bg_disabled" : "")}
                value={value}
                disabled={disableWithPopup || disabled}
            />

            {required && (
                <div className="text_error">{required && internalError}</div>
            )}
        </div>
    );
};

export default AppInput;
