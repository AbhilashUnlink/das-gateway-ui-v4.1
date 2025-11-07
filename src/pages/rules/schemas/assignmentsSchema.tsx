import {
  componentTypes,
} from "@data-driven-forms/react-form-renderer";
// import RuleLabel from "components/rule-label/RuleLabel";



export const assignmentsSchema = (
  acquirerList: any,
  // acquirerMIDList: any,
  merchantList: any,
  merchantDasMidList: any,
  poEntityList: any
) => {
  return {
    fields: [
      {
        component: componentTypes.FIELD_ARRAY,
        name: "rules",
        fieldKey: "rules_field_array",
        itemDefault: {
          assignmentType:"MERCHANT_ID"
        },
        // {
        //   AssignmentType: "",
        //   assignmentValue: "",
        //   priority: "1",
        // },
        fields: [
          {
            component: componentTypes.SELECT,
            style: { marginTop: "-16px" },
            name: "assignmentType",
            labelWithTooltip: "Assignment Type is the type of assignment that will be applied to the rule",
            placeholder: "Assignment Type",
            isRequired: true,
            options: assignmentTypeOptions,
          },
          {
            component: componentTypes.SELECT,
            style: { marginTop: "-16px" },
            name: "assignmentValue",
            labelWithTooltip: "Assignment Value is the value that will be applied to the assignment",
            placeholder: "Assignment Value",
            // multiple: true,
            isSearchable: true,
            condition: {
              when: "assignmentType",
              is: "MERCHANT_ID",
            },
            options: merchantList,
          },
          {
            component: componentTypes.SELECT,
            style: { marginTop: "-16px" },
            name: "assignmentValue",
            isSearchable: true,
            // multiple: true,
            labelWithTooltip: "Assignment Value is the value that will be applied to the assignment",
            placeholder: "Assignment Value",
            condition: {
              when: "assignmentType",
              is: "DASMID",
            },
            options: merchantDasMidList,
          },
          {
            component: componentTypes.SELECT,
            style: { marginTop: "-16px" },
            name: "assignmentValue",
            isSearchable: true,
            // multiple: true,
            labelWithTooltip: "Assignment Value is the value that will be applied to the assignment",
            placeholder: "Assignment Value",
            condition: {
              when: "assignmentType",
              is: "ACQUIRER_ID",
            },
            options: acquirerList,
          },
          // {
          //   component: componentTypes.SELECT,
          //   style: { marginTop: "-16px" },
          //   name: "assignmentValue",
          //   isSearchable: true,
          //   labelWithTooltip: "Assignment Value is the value that will be applied to the assignment",
          //   placeholder: "Assignment Value",
          //   // multiple: true,
          //   condition: {
          //     when: "assignmentType",
          //     is: "ACQUIRER_MID",
          //   },
          //   options: acquirerMIDList,
          // },
          {
            component: componentTypes.SELECT,
             style: { marginTop: "-16px" },
            name: "assignmentValue",
            labelWithTooltip: "Assignment Value is the value that will be applied to the assignment",
            placeholder: "Assignment Value",
            // multiple: true,
            condition: {
              when: "assignmentType",
              is: "SUBSIDIARY_ID",
            },
            options: poEntityList,
          },
          // {
          //   component: componentTypes.TEXT_FIELD,
          //   name: "priority",
          //   label: "Priority",
          //   type: "number",
          //   dataType: "integer",
          // },
        ],
      },
    ],
  };
};

export const assignmentTypeOptions = [
  { label: "PO Entity", value: "SUBSIDIARY_ID" },
  { label: "Acquirer", value: "ACQUIRER_ID" },
  { label: "Merchant(s)", value: "MERCHANT_ID" },
  { label: "Das MID", value: "DASMID" },
  // { label: "Acquirer MID", value: "ACQUIRER_MID" },

  // { label: "Region", value: "REGION" },
  // { label: "Global", value: "GLOBAL" },
];