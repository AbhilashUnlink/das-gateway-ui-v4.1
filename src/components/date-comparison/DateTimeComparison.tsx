import CustomBodyRowDisplay from "components/das-table/CustomBodyRowDisplay";
import React, { type JSX } from "react";

interface DateTimeComparisonProps {
  transactionDateStr?: string;
  updatedDateStr?: string;
}

const DateTimeComparison: React.FC<DateTimeComparisonProps> = ({
  transactionDateStr,
  updatedDateStr,
}) => {
  if (!transactionDateStr || !updatedDateStr) return null;

  const transaction = new Date(transactionDateStr);
  const updated = new Date(updatedDateStr);

  const isDifferent =
    transaction.getHours() !== updated.getHours() ||
    transaction.getMinutes() !== updated.getMinutes() ||
    transaction.getSeconds() !== updated.getSeconds();

  // ✅ Proper formatter for display (local time)
  const formatDate = (date: Date) =>
    date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const transactionDate = formatDate(transaction);
  const updatedDate = formatDate(updated);

  // Extract time for red second highlighting
  const timeMatch = transactionDate.match(/(\d{2}:\d{2}:\d{2})/);
  let updatedTimeElement: JSX.Element | string = transactionDate;

  if (timeMatch) {
    const [hours, minutes, seconds] = timeMatch[0].split(":");
    const before = transactionDate.split(timeMatch[0])[0];
    const after = transactionDate.split(timeMatch[0])[1];

    updatedTimeElement = (
      <span>
        {before}
        {hours}:{minutes}:
        <span style={{ color: isDifferent ? "red" : "inherit" }}>{seconds}</span>
        {after}
      </span>
    );
  }

  return (
    <CustomBodyRowDisplay rowTopValue={updatedTimeElement} rowBottomValue={updatedDate} rowTopClassName="top-label-value"/>
  );
};

export default DateTimeComparison;
