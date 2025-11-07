export const Operator_Options = [
  { label: "Equals", value: "EQUALS", natural: "equals" },
  { label: "Not Equals", value: "NOT_EQUALS", natural: "does not equal" },
  { label: "Greater Than", value: "GREATER_THAN", natural: "is greater than" },
  { label: "Less Than", value: "LESS_THAN", natural: "is less than" },
  {
    label: "Greater Than or Equals",
    value: "GREATER_THAN_EQUALS",
    natural: "is greater than or equal to",
  },
  {
    label: "Less Than or Equals",
    value: "LESS_THAN_EQUALS",
    natural: "is less than or equal to",
  },
  { label: "Contains", value: "CONTAINS", natural: "contains" },
  {
    label: "Does Not Contain",
    value: "NOT_CONTAINS",
    natural: "does not contain",
  },
  { label: "Starts With", value: "STARTS_WITH", natural: "starts with" },
  { label: "Ends With", value: "ENDS_WITH", natural: "ends with" },
  { label: "In List", value: "IN", natural: "is in list" },
  { label: "Not In List", value: "NOT_IN", natural: "is not in list" },
  { label: "Between", value: "BETWEEN", natural: "is between" },
  { label: "Regex Match", value: "REGEX_MATCH", natural: "matches regex" },
  { label: "Is Null", value: "IS_NULL", natural: "is null" },
  { label: "Is Not Null", value: "IS_NOT_NULL", natural: "is not null" },
];

//TEXTFIELD OPERATOR LIST
export const TextField_Operator_Options = [
  { label: "Equals", value: "EQUALS", natural: "equals" },
  { label: "Not Equals", value: "NOT_EQUALS", natural: "does not equal" },
  { label: "Contains", value: "CONTAINS", natural: "contains" },
  {
    label: "Does Not Contain",
    value: "NOT_CONTAINS",
    natural: "does not contain",
  },
  { label: "Starts With", value: "STARTS_WITH", natural: "starts with" },
  { label: "Ends With", value: "ENDS_WITH", natural: "ends with" },
  { label: "In List", value: "IN", natural: "is in list" },
  { label: "Not In List", value: "NOT_IN", natural: "is not in list" },
  { label: "Is Null", value: "IS_NULL", natural: "is null" },
  { label: "Is Not Null", value: "IS_NOT_NULL", natural: "is not null" },
];

//NUMERICFIELD OPERATOR LIST
export const NumericField_Operator_Options = [
  { label: "Equals", value: "EQUALS", natural: "equals" },
  { label: "Not Equals", value: "NOT_EQUALS", natural: "does not equal" },
  { label: "Greater Than", value: "GREATER_THAN", natural: "is greater than" },
  { label: "Less Than", value: "LESS_THAN", natural: "is less than" },
  {
    label: "Greater Than or Equals",
    value: "GREATER_THAN_EQUALS",
    natural: "is greater than or equal to",
  },
  {
    label: "Less Than or Equals",
    value: "LESS_THAN_EQUALS",
    natural: "is less than or equal to",
  },
  { label: "Is Null", value: "IS_NULL", natural: "is null" },
  { label: "Is Not Null", value: "IS_NOT_NULL", natural: "is not null" },
  { label: "Between", value: "BETWEEN", natural: "is between" },
];




export const riskRuleOperatorMap: Record<string, string> = Operator_Options.reduce(
  (acc, item) => {
    acc[item.value] = item.natural;
    return acc;
  },
  {} as Record<string, string>
);
