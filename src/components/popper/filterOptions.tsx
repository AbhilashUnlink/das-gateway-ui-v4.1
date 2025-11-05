export const filterTypeNumber = [
    { label: '=', value: 'eq' },
    { label: '!=', value: 'noteq' },
    { label: '>', value: 'gt' },
    { label: '>=', value: 'gteq' },
    { label: '<', value: 'lt' },
    { label: '<=', value: 'lteq' },
    { label: 'Is Null', value: 'isnull' },
    { label: 'Is Not Null', value: 'notnull' },
    { label: 'Between', value: 'between' },
    { label: 'Not Between', value: 'notbetween' },
];
  
export const filterTypeText = [
    { label: 'Contains', value: 'contains' },
    { label: 'Does Not Contain', value: 'notcontains' },
    { label: 'Begins With', value: 'begin' },
    { label: 'Does Not Begins With', value: 'notbegin' },
    { label: 'Ends With', value: 'endwith' },
    { label: 'Does Not Ends With', value: 'notendwith' },
    { label: 'Equals', value: 'eq' },
    { label: 'Does Not Equals', value: 'noteq' },
    // { label: 'In', value: 'in' },
    // { label: 'Not In', value: 'notin' },
    { label: 'Is Null', value: 'isnull' },
    { label: 'Is Not Null', value: 'notnull' },
];

export const filterTypeSelect = [
    { label: 'Equals', value: 'eq' },
    { label: 'Does Not Equals', value: 'noteq' },
    { label: 'Is Null', value: 'isnull' },
    { label: 'Is Not Null', value: 'notnull' },
    { label: 'In', value: 'in' },
    { label: 'Not In', value: 'notin' },
];

export const filterTypeNumberString = [
    { label: '=', value: 'eq' },
    { label: '!=', value: 'noteq' },
    { label: '>', value: 'gt' },
    { label: '>=', value: 'gteq' },
    { label: '<', value: 'lt' },
    { label: '<=', value: 'lteq' },
    { label: 'Is Null', value: 'isnull' },
    { label: 'Is Not Null', value: 'notnull' },
];

export const filterTypeSelectWithoutIn = [
    { label: 'Equals', value: 'eq' },
    { label: 'Does Not Equals', value: 'noteq' },
    { label: 'Is Null', value: 'isnull' },
    { label: 'Is Not Null', value: 'notnull' },
];

export const operatorOptionsMap: Record<string, any> = {
    numeric: filterTypeNumber,
    text: filterTypeText,
    select:filterTypeSelect,
    autoSelect:filterTypeSelect,
    dateRangePicker:filterTypeNumber,
    newDateRangePicker:filterTypeNumber,
    monthPicker:filterTypeNumber,
    numberString:filterTypeNumberString,
    selectWithoutIn:filterTypeSelectWithoutIn
  };

export const OPERATORS_VALUE = {
    IN:'in',
    NOT_IN:'notin',
    IS_NULL:'isnull',
    IS_NOT_NULL:'notnull',
    EQUAL:'eq',
    NOT_EQUAL:'noteq',
    GREATER:'gt',
    GREATER_EQUAL:'gteq',
    LESSTHAN:'lt',
    LESSTHAN_EQUAL:'lteq',
    CONTAINS:'contains',
    NOT_CONTAINS:'notcontains',
    BEGIN:'begin',
    NOT_BEGIN:'notbegin',
    END_WITH:'endwith',
    NOT_END_WITH:'notendwith',
    BETWEEN:'between',
    NOT_BETWEEN:'notbetween'
};