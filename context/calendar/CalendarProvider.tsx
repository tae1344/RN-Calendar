import CalendarContext from './CalendarContext';
import React, { ReactNode, useRef, useState } from 'react';
import { LocalDate } from '@js-joda/core';
import CalendarViewModel from '../../viewModel/CalendarViewModel';
import { AppPropsType } from '../../types/AppType';

type ProviderProps = AppPropsType & {
  children: ReactNode | undefined;
};

export default function CalendarProvider<T>({ children, ...props }: ProviderProps) {
  const [startDate, setStartDate] = useState<LocalDate | null>(null);
  const [endDate, setEndDate] = useState<LocalDate | null>(null);
  const calendarModel = useRef(new CalendarViewModel()).current;

  return (
    <CalendarContext.Provider
      value={{ startDate, setStartDate, endDate, setEndDate, calendarModel: calendarModel, ...props }}>
      {children}
    </CalendarContext.Provider>
  );
}
