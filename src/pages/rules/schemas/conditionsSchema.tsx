import { componentTypes } from "@data-driven-forms/react-form-renderer";
import countries from "config/common/countries";
import {TextField_Operator_Options, NumericField_Operator_Options } from "../constants/operators";
import { t } from "i18next";

const TEXTFIELDS_LIST = [
  "BIN",
  "PAN",
  "Hash_Card",
  "IP_ADDRESS",
  "MERCHANT_ID",
  "SUBSIDIARY_ID",
  "CUSTOMER_ID",
  "CARD_HOLDER_NAME",
  "EMAIL_ADDRESS"
];

const NUMERICFIELDS_LIST = [
  "AMOUNT"
];

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "SGD", value: "SGD" },
  { label: "JPY", value: "JPY" },
  { label: "HKD", value: "HKD" },
  { label: "PHP", value: "PHP" },
];

const transactionTypeOptions = [
  { label: "Authorization", value: "AUTHORISATION" },
  { label: "Purchase", value: "PURCHASE" },
  { label: "Capture", value: "CAPTURE" },
  { label: "Refund", value: "REFUND" },
  { label: "Void Authorization", value: "VOIDAUTHORISATION" },
];

const paymentTypeOptions = [
  { label: "Card Payment", value: "card" },
  { label: "G Cash", value: "gcash" },
  { label: "Konbini", value: "konbini" },
  { label: "PayEasy", value: "pay-easy" },
  { label: "PayPay", value: "paypay" },
];

const schemeTypeOptions = [
  { label: "Amex", value: "amex" },
  { label: "Apple Pay", value: "apple-pay" },
  { label: "Diners Club", value: "diners-club" },
  { label: "G Cash", value: "gcash" },
  { label: "Google Pay", value: "google-pay" },
  { label: "JCB", value: "jcb" },
  { label: "Konbini", value: "konbini" },
  { label: "MasterCard", value: "master-card" },
  { label: "Pay Easy", value: "pay-easy" },
  { label: "PayPay", value: "paypay" },
  { label: "Visa", value: "visa" },
];

const conditionTypeOptions = [
  { label: "No", value: "SIMPLE" },
  // { label: "Complex", value: "COMPLEX" },
  { label: "Yes", value: "AGGREGATE" },
  // { label: "Temporal", value: "TEMPORAL" },
  // { label: "Geographic", value: "GEOGRAPHIC" },
];

// const fieldOptions = [
//   { label: "Amount", value: "AMOUNT" },
//   { label: "Currency", value: "CURRENCY" },
//   { label: "Bin", value: "BIN" },
//   { label: "Pan (Encrypted)", value: "Hash_Card" },
//   { label: "IP Address", value: "IP_ADDRESS" },
//   { label: "Billing Country", value: "COUNTRY" },
//   { label: "Merchant Id", value: "MERCHANT_ID" },
//   // { label: "Subsidary Id", value: "SUBSIDIARY_ID" },
//   { label: "Transaction Type", value: "TRANSACTION_TYPE" },
//   { label: "Card Type", value: "CARD_TYPE" },
//   // { label: "Customer Id", value: "CUSTOMER_ID" },
//   { label: "Pan issuing country", value: "BIN_COUNTRY" },
//   { label: "Card Holder Name", value: "CARD_HOLDER_NAME" },
//   { label: "Email Address", value: "EMAIL_ADDRESS" },
//   { label: "Payment Type", value: "PAYMENT_TYPE" },
// ];

const blacklistRuleFieldOptions = [
  { label: "Pan issuing country", value: "BIN_COUNTRY" },
  { label: "Billing Country", value: "COUNTRY" },
  { label: "Pan (Encrypted)", value: "Hash_Card" },
  { label: "Bin", value: "BIN" },
  { label: "IP Address", value: "IP_ADDRESS" },
  { label: "Card Holder Name", value: "CARD_HOLDER_NAME" },
  { label: "Email Address", value: "EMAIL_ADDRESS" },
  { label: "Payment Type", value: "PAYMENT_TYPE" },
  { label: "Scheme", value: "CARD_TYPE" },
  { label: "Currency", value: "CURRENCY" },
  { label: "Transaction Type", value: "TRANSACTION_TYPE" },

  // { label: "Amount", value: "AMOUNT" },
  // { label: "Merchant Id", value: "MERCHANT_ID" },
  // { label: "Subsidary Id", value: "SUBSIDIARY_ID" },
  // { label: "Customer Id", value: "CUSTOMER_ID" },
];

const thresholdRuleFieldOptions = [
  { label: "Payment Type", value: "PAYMENT_TYPE" },
  { label: "Transaction Type", value: "TRANSACTION_TYPE" },
  { label: "Scheme", value: "CARD_TYPE" },
  { label: "Currency", value: "CURRENCY" },
  { label: "Amount", value: "AMOUNT" },

  // { label: "Bin", value: "BIN" },
  // { label: "Pan (Encrypted)", value: "Hash_Card" },
  // { label: "IP Address", value: "IP_ADDRESS" },
  // { label: "Billing Country", value: "COUNTRY" },
  // { label: "Merchant Id", value: "MERCHANT_ID" },
  // { label: "Subsidary Id", value: "SUBSIDIARY_ID" },
  // { label: "Customer Id", value: "CUSTOMER_ID" },
  // { label: "Pan issuing country", value: "BIN_COUNTRY" },
  // { label: "Card Holder Name", value: "CARD_HOLDER_NAME" },
  // { label: "Email Address", value: "EMAIL_ADDRESS" },
];

const velocityRuleFieldOptions = [
  { label: "Pan issuing country", value: "BIN_COUNTRY" },
  { label: "Billing Country", value: "COUNTRY" },
  { label: "Pan (Encrypted)", value: "Hash_Card" },
  { label: "Bin", value: "BIN" },
  { label: "IP Address", value: "IP_ADDRESS" },
  { label: "Card Holder Name", value: "CARD_HOLDER_NAME" },
  { label: "Email Address", value: "EMAIL_ADDRESS" },
  { label: "Payment Type", value: "PAYMENT_TYPE" },
  { label: "Scheme", value: "CARD_TYPE" },
  { label: "Currency", value: "CURRENCY" },
  { label: "Transaction Type", value: "TRANSACTION_TYPE" },

  // { label: "Amount", value: "AMOUNT" },
  // { label: "Merchant Id", value: "MERCHANT_ID" },
  // { label: "Subsidary Id", value: "SUBSIDIARY_ID" },
  // { label: "Customer Id", value: "CUSTOMER_ID" },
];

const volumeRuleFieldOptions = [
  { label: "Payment Type", value: "PAYMENT_TYPE" },
  { label: "Transaction Type", value: "TRANSACTION_TYPE" },
  { label: "Scheme", value: "CARD_TYPE" },
  { label: "Currency", value: "CURRENCY" },
  { label: "Amount", value: "AMOUNT" },

  // { label: "Bin", value: "BIN" },
  // { label: "Pan (Encrypted)", value: "Hash_Card" },
  // { label: "IP Address", value: "IP_ADDRESS" },
  // { label: "Billing Country", value: "COUNTRY" },
  // { label: "Merchant Id", value: "MERCHANT_ID" },
  // { label: "Subsidary Id", value: "SUBSIDIARY_ID" },
  // { label: "Customer Id", value: "CUSTOMER_ID" },
  // { label: "Pan issuing country", value: "BIN_COUNTRY" },
  // { label: "Card Holder Name", value: "CARD_HOLDER_NAME" },
  // { label: "Email Address", value: "EMAIL_ADDRESS" },
];

export const blacklistConditionsSchema = {
  fields: [
    {
      component: componentTypes.FIELD_ARRAY,
      name: "rules",
      fieldKey: "rules_field_array",
      itemDefault: {
         conditionType: "SIMPLE",
        field: "IP_ADDRESS",
        /**
         * Changing the default required to handle the fields  Pan issuing country and Billing country
         * because backend expecting CONTAINS not any other operator
         * Please handle the case before changing the default operator
         */
        operator: "CONTAINS" 
        // conditionType: "AGGREGATE",
      },
      fields: [
        // {
        //   component: componentTypes.SELECT,
        //   style: { marginTop: "-16px" },
        //   name: "conditionType",
        //   // disabled: true,
        //   labelWithTooltip: "Aggregate will apply to all transactions and simple will apply to each transaction",
        //   placeholder: "Type",
        //   // label: <RuleLabel title="Aggregate will apply to all transactions and simple will apply to each transaction" label="Type" />,
        //   isSearchable: true,
        //   options: conditionTypeOptions,
        // },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "field",
          labelWithTooltip: "Field is the field that will be applied to the condition",
          placeholder: "Field",
          isSearchable: true,
          options: blacklistRuleFieldOptions,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...TEXTFIELDS_LIST],
          },
          options: TextField_Operator_Options,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...NUMERICFIELDS_LIST],
          },
          options: NumericField_Operator_Options,
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: "value",
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          condition: { when: "field", is: [...NUMERICFIELDS_LIST, ...TEXTFIELDS_LIST] },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: paymentTypeOptions,
          condition: { when: "field", is: "PAYMENT_TYPE" },
        }, 
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: transactionTypeOptions,
          condition: { when: "field", is: "TRANSACTION_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: t("field_value"),
          placeholder: "Value",
          options: schemeTypeOptions,
          condition: { when: "field", is: "CARD_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: currencyOptions,
          condition: { when: "field", is: "CURRENCY" },
        },
        {
          name: "value",
          component: "transfer",
          // multiple: true,
          // isSearchable: true,
          options: countries.map((item) => ({
            label: item.name,
            value: item.value,
          })),
          // label: <RuleLabel title="Please Select Countries" label="Please Select Countries" />,
          condition: { when: "field", is: ["COUNTRY", "BIN_COUNTRY"] },
        },
      ],
    },
  ],
};

export const velocityConditionsSchema = {
  fields: [
    {
      component: componentTypes.FIELD_ARRAY,
      name: "rules",
      fieldKey: "rules_field_array",
      itemDefault: {
        conditionType: "SIMPLE",
        field: "CARD_HOLDER_NAME",
        operator: "CONTAINS",
      },
      fields: [
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          // description: "This will apply to each transaciton",
          name: "conditionType",
          labelWithTooltip: "Aggregate will apply to all transactions and simple will apply to each transaction",
          placeholder: "Aggregate",
          isSearchable: true,
          options: conditionTypeOptions,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "field",
          labelWithTooltip: "Field is the field that will be applied to the condition",
          placeholder: "Field",
          isSearchable: true,
          options: velocityRuleFieldOptions,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: t("operator"),
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...TEXTFIELDS_LIST],
          },
          options: TextField_Operator_Options,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...NUMERICFIELDS_LIST],
          },
          options: NumericField_Operator_Options,
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: "value",
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          condition: { when: "field", is: [...NUMERICFIELDS_LIST, ...TEXTFIELDS_LIST] },
        },
                {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: paymentTypeOptions,
          condition: { when: "field", is: "PAYMENT_TYPE" },
        }, 
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: transactionTypeOptions,
          condition: { when: "field", is: "TRANSACTION_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: schemeTypeOptions,
          condition: { when: "field", is: "CARD_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: currencyOptions,
          condition: { when: "field", is: "CURRENCY" },
        },
        {
          name: "value",
          component: "transfer",
          // multiple: true,
          // isSearchable: true,
          options: countries.map((item) => ({
            label: item.name,
            value: item.value,
          })),
          // label: <RuleLabel title="Please Select Countries" label="Please Select Countries" />,
          condition: { when: "field", is: ["COUNTRY", "BIN_COUNTRY"] },
        },
        // {
        //   component: componentTypes.SELECT,
        //   style: { marginTop: "-16px" },
        //   name: "appliesTo",
        //   labelWithTooltip: "All will apply to all transactions and specific will apply to each transaction",
        //   placeholder: "Apply To",
        //   options: [
        //     {
        //       label: "All",
        //       value: "all",
        //     },
        //     {
        //       label: "Specific",
        //       value: "specific",
        //     },
        //   ],
        // },
        // {
        //   component: componentTypes.SELECT,
        //   style: { marginTop: "-16px" },
        //   name: "operator",
        //   labelWithTooltip: "Operator is the condition that will be applied to the field",
        //   placeholder: "Operator",
        //   options: Operator_Options,
        //   condition: {
        //     when: "appliesTo",
        //     is: "specific",
        //   },
        // },
      ],
    },
  ],
};


export const volumeConditionsSchema = {
  fields: [
    {
      component: componentTypes.FIELD_ARRAY,
      name: "rules",
      fieldKey: "rules_field_array",
      itemDefault: {
         conditionType: "SIMPLE",
        field: "AMOUNT",
        /**
         * Changing the default required to handle the fields  Pan issuing country and Billing country
         * because backend expecting CONTAINS not any other operator
         * Please handle the case before changing the default operator
         */
        operator: "EQUALS" 
        // conditionType: "AGGREGATE",
      },
      fields: [
        // {
        //   component: componentTypes.SELECT,
        //   style: { marginTop: "-16px" },
        //   name: "conditionType",
        //   // disabled: true,
        //   labelWithTooltip: "Aggregate will apply to all transactions and simple will apply to each transaction",
        //   placeholder: "Type",
        //   // label: <RuleLabel title="Aggregate will apply to all transactions and simple will apply to each transaction" label="Type" />,
        //   isSearchable: true,
        //   options: conditionTypeOptions,
        // },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "field",
          labelWithTooltip: "Field is the field that will be applied to the condition",
          placeholder: "Field",
          isSearchable: true,
          options: volumeRuleFieldOptions,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...NUMERICFIELDS_LIST],
          },
          options: NumericField_Operator_Options,
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...TEXTFIELDS_LIST],
          },
          options: TextField_Operator_Options,
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: "value",
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          condition: { when: "field", is: [...NUMERICFIELDS_LIST, ...TEXTFIELDS_LIST] },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: paymentTypeOptions,
          condition: { when: "field", is: "PAYMENT_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: currencyOptions,
          condition: { when: "field", is: "CURRENCY" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: transactionTypeOptions,
          condition: { when: "field", is: "TRANSACTION_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: schemeTypeOptions,
          condition: { when: "field", is: "CARD_TYPE" },
        },
        {
          name: "value",
          component: "transfer",
          // multiple: true,
          // isSearchable: true,
          options: countries.map((item) => ({
            label: item.name,
            value: item.value,
          })),
          // label: <RuleLabel title="Please Select Countries" label="Please Select Countries" />,
          condition: { when: "field", is: ["COUNTRY", "BIN_COUNTRY"] },
        },
      ],
    },
  ],
};
export const thresholdConditionsSchema = {
  fields: [
    {
      component: componentTypes.FIELD_ARRAY,
      name: "rules",
      fieldKey: "rules_field_array",
      itemDefault: {
         conditionType: "SIMPLE",
        field: "AMOUNT",
        /**
         * Changing the default required to handle the fields  Pan issuing country and Billing country
         * because backend expecting CONTAINS not any other operator
         * Please handle the case before changing the default operator
         */
        operator: "EQUALS" 
        // conditionType: "AGGREGATE",
      },
      fields: [
        // {
        //   component: componentTypes.SELECT,
        //   style: { marginTop: "-16px" },
        //   name: "conditionType",
        //   // disabled: true,
        //   labelWithTooltip: "Aggregate will apply to all transactions and simple will apply to each transaction",
        //   placeholder: "Type",
        //   // label: <RuleLabel title="Aggregate will apply to all transactions and simple will apply to each transaction" label="Type" />,
        //   isSearchable: true,
        //   options: conditionTypeOptions,
        // },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "field",
          labelWithTooltip: "Field is the field that will be applied to the condition",
          placeholder: "Field",
          isSearchable: true,
          options: thresholdRuleFieldOptions,
        },
        // for numeric values like date, amount etc.
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...NUMERICFIELDS_LIST],
          },
          options: NumericField_Operator_Options,
        },
        // for text/string values
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "operator",
          labelWithTooltip: "Operator is the condition that will be applied to the field",
          placeholder: "Operator",
          condition: {
            when: "field",
            is: [...TEXTFIELDS_LIST],
          },
          options: TextField_Operator_Options,
        },
        {
          component: componentTypes.TEXT_FIELD,
          name: "value",
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          condition: { when: "field", is: [...NUMERICFIELDS_LIST, ...TEXTFIELDS_LIST] },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: transactionTypeOptions,
          condition: { when: "field", is: "TRANSACTION_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: schemeTypeOptions,
          condition: { when: "field", is: "CARD_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: paymentTypeOptions,
          condition: { when: "field", is: "PAYMENT_TYPE" },
        },
        {
          component: componentTypes.SELECT,
          style: { marginTop: "-16px" },
          name: "value",
          // multiple: true,
          isSearchable: true,
          labelWithTooltip: "Value is the value that will be applied to the field",
          placeholder: "Value",
          options: currencyOptions,
          condition: { when: "field", is: "CURRENCY" },
        },
        {
          name: "value",
          component: "transfer",
          // multiple: true,
          // isSearchable: true,
          options: countries.map((item) => ({
            label: item.name,
            value: item.value,
          })),
          // label: <RuleLabel title="Please Select Countries" label="Please Select Countries" />,
          condition: { when: "field", is: ["COUNTRY", "BIN_COUNTRY"] },
        },
      ],
    },
  ],
};

export const conditionsSchema: any = {
  BLACKLIST: blacklistConditionsSchema,
  VELOCITY: velocityConditionsSchema,
  THRESHOLD: thresholdConditionsSchema,
  VOLUME: volumeConditionsSchema,
};
