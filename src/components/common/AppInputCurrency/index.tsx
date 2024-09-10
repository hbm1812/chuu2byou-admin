import React, { useState, useEffect } from "react";
import { Input } from "antd";
import classNames from "classnames";
import {formatCurrency} from "../../../utils";

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

const AppInputCurrency: React.FC<Props & React.ComponentProps<typeof Input>> = ({
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
    const [formattedValue, setFormattedValue] = useState<string>(value as string || "");

    useEffect(() => {
        if (validate && required && !value) {
            setInternalError("Vui lòng không để trống");
        } else {
            setInternalError(error);
        }
    }, [validate, required, value, error]);

    const combinedStyleAppInput = { ...styleAppInput, width: widthAppInput };
    const combinedStyleInput = { ...styleInput, width: widthInput };

    useEffect(() => {
        if (value !== undefined && value !== null) {
            setFormattedValue(formatCurrency(String(value)));
        }
    }, [value]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = String(e.target.value).replace(/[^0-9]/g, ''); // Chuyển đổi value thành chuỗi trước khi loại bỏ ký tự không phải số
        setFormattedValue(formatCurrency(rawValue));
        if (restProps.onChange) {
            restProps.onChange({
                ...e,
                target: {
                    ...e.target,
                    value: rawValue, // Trả lại giá trị gốc không format để xử lý trong form
                },
            });
        }
    };

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
                value={formattedValue}
                disabled={disableWithPopup || disabled}
                onChange={handleInputChange}
            />

            {required && (
                <div className="text_error">{required && internalError}</div>
            )}
        </div>
    );
};

export default AppInputCurrency;
