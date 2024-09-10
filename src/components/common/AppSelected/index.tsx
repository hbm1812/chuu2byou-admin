// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Select} from "antd";
import classNames from "classnames";
import {normalizeString} from "../../../utils";

type Props = {
    styleAppSelected?: React.CSSProperties;
    widthAppSelected?: number | string;
    styleSelected?: React.CSSProperties;
    widthSelected?: number | string;
    classNameAppSelected?: string;
    classNameSelected?: string;
    required?: boolean;
    fontSizeTitle?: number | string;
    title?: string;
    error?: string;
    validate?: boolean;
    disableWithSelected?: boolean;
    disabled?: boolean
    options: { value: string | number | boolean | null | undefined; label: string | number | null | undefined }[];
    filterByLabel?: string | number | boolean;
};

const AppSelected: React.FC<Props & React.ComponentProps<typeof Select>> = ({
                                                                                styleAppSelected,
                                                                                widthAppSelected,
                                                                                styleSelected,
                                                                                widthSelected,
                                                                                classNameAppSelected,
                                                                                classNameSelected,
                                                                                required,
                                                                                fontSizeTitle,
                                                                                title,
                                                                                error,
                                                                                value,
                                                                                validate,
                                                                                options,
                                                                                filterByLabel,
                                                                                disabled,
                                                                                disableWithSelected,
                                                                                ...restProps
                                                                            }) => {
    const [internalError, setInternalError] = useState<string | undefined>(error);

    useEffect(() => {
        if (validate && required && !value) {
            setInternalError("Vui lòng chọn");
        } else {
            setInternalError(error);
        }
    }, [validate, required, value, error]);

    const combinedStyleAppSelected = {
        ...styleAppSelected,
        width: widthAppSelected,
    };
    const combinedStyleSelected = {...styleSelected, width: widthSelected};

    const titleStyle = {
        fontSize: fontSizeTitle ? fontSizeTitle : 15,
        margin: "10px 0px",
    };

    const filterOptionLabel: any = (
        input: string,
        option?: { label: string; value: string | number | boolean }
    ) => normalizeString(option?.label)?.includes(normalizeString(input));
    return (
        <div
            style={combinedStyleAppSelected}
            className={classNames("appSelected_main", classNameAppSelected)}
        >
            {title && (
                <div style={titleStyle} className="title_selected_main">
                    <span>{title && required ? "*" : null} </span>
                    {title}
                </div>
            )}

            <Select
                {...restProps}
                style={combinedStyleSelected}
                className={classNames("selected_main", classNameSelected, {"has-error": required && internalError})}
                value={value}
                options={options}
                optionFilterProp="children"
                filterOption={filterByLabel && filterOptionLabel}
                disabled={disableWithSelected || disabled}
            />
            {required && (
                <div className="text_error">{required && internalError}</div>
            )}
        </div>
    );
};

export default AppSelected;
