import { LocalDate } from '@js-joda/core';

type CalendarDateResultType = {
  startDate: LocalDate | null;
  endDate: LocalDate | null;
};

type AppPropsType = {
  activeColor?: string;
  monthCount?: number;
  onPressDay?: (date?: CalendarDateResultType) => void;
};

export type { AppPropsType, CalendarDateResultType };
