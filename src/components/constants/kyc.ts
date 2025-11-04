import React from 'react';
import { ThumbUpOutlined, ThumbDownOutlined, HourglassBottomOutlined } from '@mui/icons-material';

//type KYCStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processing';

export const KYC_COLOR: any = {
  Pending: '#eb8904',
  Completed: '#007c0f',
  Rejected: '#FF0000',
  Processing: '#0f04b8',
  Review: '#0488b8',
  "Manual KYC required": '#0488b8',
};

export const KYC_ICON: any = {
  Pending: React.createElement(HourglassBottomOutlined),
  Completed: React.createElement(ThumbUpOutlined),
  Rejected: React.createElement(ThumbDownOutlined),
  Processing: React.createElement(HourglassBottomOutlined),
  Review: React.createElement(HourglassBottomOutlined),
  "Manual KYC required": React.createElement(ThumbUpOutlined),
};


export const RETRY_KYC_COUNT = 3;
