const WHITELIST_STATUS_VALUE: any = {
    YES: 'YES',
    NO: 'NO',
  };
  const WHITELIST_STATUS: any = [
    {
      label: WHITELIST_STATUS_VALUE.YES,
      value: 1,
      disabled: false,
    },
    {
      label: WHITELIST_STATUS_VALUE.NO,
      value: 0,
      disabled: false,
    },
  ];
  export { WHITELIST_STATUS, WHITELIST_STATUS_VALUE };