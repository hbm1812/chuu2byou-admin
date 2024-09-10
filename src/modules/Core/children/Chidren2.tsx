import { Moment } from "moment";
import { useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { DatePicker } from "antd";

type Props = {};
const Chidren2 = (props: Props) => {
  const [dateValue2, setDateValue2] = useState<Moment | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const handleIconClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateChange = (date: Moment | null) => {
    setDateValue2(date || undefined);
    setIsDatePickerOpen(false);
  };

  return (
    <div>
      {" "}
      <MdOutlineDateRange onClick={handleIconClick} />
      <DatePicker
        open={isDatePickerOpen}
        onOpenChange={setIsDatePickerOpen}
        onChange={handleDateChange}
        style={{ display: "none" }} // Hide the DatePicker input, only show the calendar
      />
      <p>Date: {dateValue2 ? dateValue2.format("DD/MM/YYYY") : ""}</p>
    </div>
  );
};
export default Chidren2;
