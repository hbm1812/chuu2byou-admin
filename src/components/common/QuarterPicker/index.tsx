import React, {useState, useEffect} from "react";
import {DatePicker} from "antd";
import classNames from "classnames";
import moment, {Moment} from "moment";

type Props = {
    styleAppQuarterPicker?: React.CSSProperties;
    widthAppQuarterPicker?: number | string;
    styleQuarterPicker?: React.CSSProperties;
    widthQuarterPicker?: number | string;
    classNameAppQuarterPicker?: string;
    classNameQuarterPicker?: string;
    required?: boolean;
    fontSizeTitle?: number | string;
    title?: string;
    error?: string;
    validate?: boolean;
    disableWithPopup?: boolean;
    disabled?: boolean;
    onChange?: (value: string | undefined) => void;
};

const AppQuarterPicker: React.FC<Props & React.ComponentProps<typeof DatePicker>> = ({
                                                                                         styleAppQuarterPicker,
                                                                                         widthAppQuarterPicker,
                                                                                         styleQuarterPicker,
                                                                                         widthQuarterPicker,
                                                                                         classNameAppQuarterPicker,
                                                                                         classNameQuarterPicker,
                                                                                         required,
                                                                                         fontSizeTitle,
                                                                                         title,
                                                                                         error,
                                                                                         validate,
                                                                                         disableWithPopup,
                                                                                         disabled,
                                                                                         value, // Nhận value từ Form.Item
                                                                                         onChange, // Nhận onChange từ Form.Item
                                                                                         ...restProps
                                                                                     }) => {
    const [internalError, setInternalError] = useState<string | undefined>(error);

    useEffect(() => {
        if (validate && required && (!value || !moment(value, "YYYY-[Q]Q").isValid() || moment(value, "YYYY-[Q]Q").year() < 1900 || moment(value, "YYYY-[Q]Q").year() > 2100)) {
            setInternalError("Vui lòng chọn một quý hợp lệ");
        } else {
            setInternalError(error);
        }
    }, [validate, required, value, error]);

    const handleQuarterChange = (date: unknown, dateString: string | string[]): void => {
        const momentDate = date as Moment;  // Ép kiểu `date` về `Moment`

        if (momentDate && momentDate.isValid()) {
            const formattedDateString = Array.isArray(dateString) ? dateString[0] : dateString;
            if (onChange) {
                onChange(formattedDateString); // Truyền giá trị đã định dạng vào Form.Item nếu cần
            }
        } else {
            console.log(''); // Khi date không hợp lệ
            if (onChange) {
                onChange(undefined);
            }
        }
    };

    const combinedStyleAppInput = {...styleAppQuarterPicker, width: widthAppQuarterPicker};
    const combinedStyleInput = {...styleQuarterPicker, width: widthQuarterPicker};

    const titleStyle = {
        fontSize: fontSizeTitle ? fontSizeTitle : 15,
        margin: "10px 0px",
    };

    return (
        <div
            style={combinedStyleAppInput}
            className={classNames("appQuarterPicker_main", classNameAppQuarterPicker)}
        >
            {title && (
                <div style={titleStyle}>
                    <span>{title && required ? "*" : null}</span> {title}
                </div>
            )}
            <DatePicker
                {...restProps}
                picker="quarter"
                value={value ? moment(value, "YYYY-[Q]Q") : undefined} // Chuyển đổi value thành Moment
                style={combinedStyleInput}
                className={classNames("QuarterPicker_main", classNameQuarterPicker, disableWithPopup ? "bg_disabled" : "")}
                disabled={disableWithPopup || disabled}
                onChange={handleQuarterChange}
            />
            {required && (
                <div className="text_error">{required && internalError}</div>
            )}
        </div>
    );
};

export default AppQuarterPicker;
