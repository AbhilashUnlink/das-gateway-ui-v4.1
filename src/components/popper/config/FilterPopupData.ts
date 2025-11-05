const FilterPopupData = {
  form: {
    sections: [
      {
        label: "Advanced Filters",
        columns: "two-column",
        fields: [
          {
            readOnly: false,
            type: "",
            name: "HeaderColumn",
            label: "Filter.field",
            html_element: "Select",
            options: [],
          },
          {
            multiple: false,
            default_value: "",
            name: "Name",
            label: "Filter.Value",
            required: true,
            data_type: "String",
            html_element: "TextField",
          },
        ],
      },
    ],
  },
};

export default FilterPopupData;
