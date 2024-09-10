import React from "react";
import { format, parseISO } from "date-fns";

interface DateTimeComponentProps {
  dateString: string;
}

const DateTimeComponent: React.FC<DateTimeComponentProps> = ({
  dateString,
}) => {
  let formattedDate = "Invalid date";

  try {
    const date = parseISO(dateString);
    formattedDate = format(date, "HH:mm:ss dd/MM/yyyy");
  } catch (error) {
    console.error("Invalid date string:", dateString);
  }

  return <div>{formattedDate}</div>;
};

export default DateTimeComponent;
