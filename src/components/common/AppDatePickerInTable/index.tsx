import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import MaskedTextInput, { Mask } from "react-text-mask";
import { vi } from "date-fns/locale";
import { MdOutlineDateRange } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi", vi);
setDefaultLocale("vi");

interface Props {
  label?: string;
  styleAppDatePicker?: React.CSSProperties;
  widthAppSDatePicker?: number | string;
  horizontal?: boolean;
  defaultDate?: string;
  isRequired?: boolean;
  noLabel?: boolean;
  disabled?: boolean;
  mask?: Mask;
  readOnly?: boolean;
  showYearPicker?: boolean;
  handleGetValue?: (e: string) => void;
  dateFormat?: string;
  minDate?: string | number;
  maxDate?: string | number;
  showMonthDropdown?: boolean;
  showYearDropdown?: boolean;
  showMonthYearPicker?: boolean;
  showYearOnlyPicker?: boolean;
  placeholder?: string;
  value?: string; // Giá trị từ Form.Item
  onChange?: (value: string) => void; // Hàm onChange từ Form.Item
}

const DATE_FORMAT = "DD/MM/YYYY";
const MONTH_FORMAT = "MM/YYYY";
const YEAR_FORMAT = "YYYY";

const AppDatePickerInTable: React.FC<Props> = ({
  label,
  noLabel,
  isRequired,
  horizontal,
  defaultDate,
  disabled,
  dateFormat,
  readOnly,
  showYearPicker,
  mask,
  handleGetValue,
  minDate,
  maxDate,
  showMonthDropdown,
  showYearDropdown,
  showMonthYearPicker,
  showYearOnlyPicker,
  value: propValue,
  placeholder,
  styleAppDatePicker,
  widthAppSDatePicker,
  onChange, // Thêm onChange vào đây
  ...remainProps
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(propValue || ""); // Sử dụng giá trị từ props

  const combinedStyleAppDatePicker = {
    ...styleAppDatePicker,
    width: widthAppSDatePicker,
  };

  useEffect(() => {
    if (propValue) {
      if (showYearOnlyPicker && moment(propValue, YEAR_FORMAT).isValid()) {
        setValue(propValue);
      } else if (
        showMonthYearPicker &&
        moment(propValue, MONTH_FORMAT).isValid()
      ) {
        setValue(propValue);
      } else if (moment(propValue, DATE_FORMAT).isValid()) {
        setValue(propValue);
      }
    }
  }, [propValue, showMonthYearPicker, showYearOnlyPicker]);

  const processDateInput = (value: string) => {
    if (value && !value.includes("_")) {
      const dateInput = showYearOnlyPicker
        ? moment(value, YEAR_FORMAT)
        : showMonthYearPicker
        ? moment(value, MONTH_FORMAT)
        : moment(value, DATE_FORMAT);
      if (dateInput.isValid()) {
        if (handleGetValue) {
          handleGetValue(value);
        }
        if (onChange) {
          onChange(value); // Gọi onChange từ Form.Item
        }
        const dateFormatToUse = showYearOnlyPicker
          ? YEAR_FORMAT
          : showMonthYearPicker
          ? MONTH_FORMAT
          : DATE_FORMAT;
        if (minDate && dateInput.isBefore(moment(minDate, dateFormatToUse))) {
          return moment(minDate, dateFormatToUse).format(dateFormatToUse);
        }
        if (maxDate && dateInput.isAfter(moment(maxDate, dateFormatToUse))) {
          return moment(maxDate, dateFormatToUse).format(dateFormatToUse);
        }
        return value;
      } else {
        if (handleGetValue) {
          handleGetValue("");
        }
        if (onChange) {
          onChange(""); // Gọi onChange từ Form.Item với giá trị rỗng
        }
        return "";
      }
    }
    return value;
  };

  const onChangeCalendarSelected = (dateSelected: Date | null) => {
    const dateFormatToUse = showYearOnlyPicker
      ? YEAR_FORMAT
      : showMonthYearPicker
      ? MONTH_FORMAT
      : DATE_FORMAT;
    const formattedDate = dateSelected
      ? moment(dateSelected).format(dateFormatToUse)
      : "";
    setValue(formattedDate);
    setOpen(false);
    if (handleGetValue) {
      handleGetValue(formattedDate);
    }
    if (onChange) {
      onChange(formattedDate); // Gọi onChange từ Form.Item
    }
  };

  const onBlurCheckDate = (value: string) => {
    if (value.includes("_")) {
      return "";
    }
    return value;
  };

  const renderPicker = () => {
    if (open) {
      return (
        <DatePicker
          {...remainProps}
          onClickOutside={() => setOpen(false)}
          open={true}
          className="datePicker-input"
          selected={
            moment(
              value,
              showYearOnlyPicker
                ? YEAR_FORMAT
                : showMonthYearPicker
                ? MONTH_FORMAT
                : DATE_FORMAT
            ).isValid()
              ? moment(
                  value,
                  showYearOnlyPicker
                    ? YEAR_FORMAT
                    : showMonthYearPicker
                    ? MONTH_FORMAT
                    : DATE_FORMAT
                ).toDate()
              : null
          }
          autoComplete="off"
          dateFormat={
            dateFormat ||
            (showYearOnlyPicker
              ? "yyyy"
              : showMonthYearPicker
              ? "MM/yyyy"
              : "dd/MM/yyyy")
          }
          onChange={onChangeCalendarSelected}
          locale="vi"
          disabled={disabled}
          readOnly={readOnly}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          showYearPicker={showYearOnlyPicker}
          showMonthYearPicker={showMonthYearPicker}
          portalId="root"
        />
      );
    }
    return null;
  };

  const renderInputPicker = () => {
    return (
      <div className="app-date-picker-wrap">
        <div
          className={
            open ? "datepicker-content datePicker-open" : "datepicker-content"
          }
        >
          <MaskedTextInput
            style={{ minHeight: "31px", padding: 0 }}
            type="text"
            value={value}
            mask={
              mask ||
              (showYearOnlyPicker
                ? [/\d/, /\d/, /\d/, /\d/]
                : showMonthYearPicker
                ? [/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                : [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/])
            }
            name="date-picker"
            onChange={(e) => {
              const processedValue = processDateInput(e.target.value);
              setValue(processedValue);
              if (onChange) {
                onChange(processedValue); // Gọi onChange từ Form.Item
              }
            }}
            onBlur={(e: any) => {
              const blurredValue = onBlurCheckDate(e.target.value);
              setValue(blurredValue);
              if (onChange) {
                onChange(blurredValue); // Gọi onChange từ Form.Item
              }
            }}
            placeholder={
              showYearOnlyPicker
                ? "YYYY"
                : showMonthYearPicker
                ? "MM/YYYY"
                : "DD/MM/YYYY"
            }
            disabled={disabled}
            readOnly={readOnly}
          />
          <MdOutlineDateRange
            className="suffix_icon"
            onClick={() => !disabled && !readOnly && setOpen(true)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="date-picker-container" style={combinedStyleAppDatePicker}>
      {renderInputPicker()}
      {renderPicker()}
    </div>
  );
};

export default AppDatePickerInTable;
