import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { getformatDate } from "../../../../../../../utils/helper";
import { SUBSCRIPTION_TYPE_VALUES } from "../constants/subscription";

export const TRIAL_PERIOD_DURATION_VAL = (val: any) => {
  if (
    (val.subscriptionType &&
      val.subscriptionType === SUBSCRIPTION_TYPE_VALUES.SUB_DISCOUNT) ||
    !val?.trialPeriodDuration
  ) {
    return null;
  } else {
    return val?.trialPeriodDuration;
  }
};
export const PLAN_DISCOUNT_PERCENTAGE_VALUE = (val: any) => {
  if (
    (val.subscriptionType &&
      val.subscriptionType === SUBSCRIPTION_TYPE_VALUES.SUB_TRIAL_PERIOD) ||
    !val?.planDiscountPercentage
  ) {
    return null;
  } else {
    return parseInt(val?.planDiscountPercentage);
  }
};
export const CYCLE_COUNT = (value: any) => {
  if (
    value?.subscriptionType === SUBSCRIPTION_TYPE_VALUES.INFINITE ||
    value?.subscriptionType === SUBSCRIPTION_TYPE_VALUES.SPECIFIC_DATE
  ) {
    return null;
  } else if (value?.maxCycleCount) {
    return parseInt(value?.maxCycleCount);
  } else return null;
};

const subscriptionDateFomatter = (value: any, trail = "00:00:00") => {
  const result = format(
    setHours(setMinutes(setSeconds(new Date(value), 0), 0), 0),
    "yyyy-MM-dd"
  );
  return `${result}T${trail}.000Z`;
};

export const formatLinkExpiry = (linkExpiry: any) => {
  return subscriptionDateFomatter(linkExpiry, "23:59:59");
};

export const SUBSCRIPTION_ENDS_AT_DATE = (value: any) => {
  if (
    value?.subscriptionType === SUBSCRIPTION_TYPE_VALUES.INFINITE ||
    value?.subscriptionType === SUBSCRIPTION_TYPE_VALUES.CYCLE
  ) {
    return null;
  } else if (value?.subscriptionEndsAt) {
    return subscriptionDateFomatter(value?.subscriptionEndsAt, "23:59:59");
  } else return null;
};
export const SUBSCRIPTION_STARTS_AT_DATE = (value: any) => {
  if (value.startDate === SUBSCRIPTION_TYPE_VALUES.IMMEDIATELY) {
    return new Date();
  } else if (value?.subscriptionStartsAt) {
    return subscriptionDateFomatter(value?.subscriptionStartsAt);
  } else return null;
};

export const SUBSCRIPTION_TYPE_VAL = (value: any) => {
  if (
    value.subscriptionEndsAt &&
    (value.subscriptionType === SUBSCRIPTION_TYPE_VALUES.CYCLE ||
      value.subscriptionType === SUBSCRIPTION_TYPE_VALUES.SPECIFIC_DATE)
  ) {
    return SUBSCRIPTION_TYPE_VALUES.CYCLE;
  } else if (
    value.maxCycleCount &&
    value.subscriptionType === SUBSCRIPTION_TYPE_VALUES.CYCLE
  ) {
    return SUBSCRIPTION_TYPE_VALUES.CYCLE;
  } else if (value.subscriptionType === SUBSCRIPTION_TYPE_VALUES.INFINITE) {
    return SUBSCRIPTION_TYPE_VALUES.INFINITE;
  } else return null;
};

export const INITIAL_SUBSCRIPTION_TYPE_VALUES = (value: any) => {
  if (value.subscriptionEndsAt && value.subscriptionEndsAt !== "N/A") {
    return SUBSCRIPTION_TYPE_VALUES.SPECIFIC_DATE;
  } else if (value.maxCycleCount) {
    return SUBSCRIPTION_TYPE_VALUES.CYCLE;
  } else if (value.subscriptionType === SUBSCRIPTION_TYPE_VALUES.INFINITE) {
    return SUBSCRIPTION_TYPE_VALUES.INFINITE;
  } else return null;
};

export const SELECTED_DATES = (value: any) => {
  if (value) {
    const subscriptionDate = new Date(
      value?.subscriptionStartsAt
    ).toISOString();
    const currentDate = getformatDate(subscriptionDate, "dd MMMM yyyy");

    const todayDate = new Date().toISOString();
    const selectedStartDate = getformatDate(todayDate, "dd MMMM yyyy");

    if (currentDate === selectedStartDate) {
      return SUBSCRIPTION_TYPE_VALUES.IMMEDIATELY;
    } else if (value.subscriptionStartsAt) {
      return SUBSCRIPTION_TYPE_VALUES.SPECIFIC_DATE;
    } else {
      return null;
    }
  }
  return null;
};

