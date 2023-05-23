import CalendarContext from './CalendarContext';
import React, { ReactNode, useRef, useState } from 'react';
import { LocalDate } from '@js-joda/core';
import CalendarViewModel from '../../viewModel/CalendarViewModel';

type ProviderProps = {
  children: ReactNode | undefined;
  sDate?: string;
  eDate?: string;
};

export default function CalendarProvider<T>({ children }: ProviderProps) {
  const [startDate, setStartDate] = useState<LocalDate | null>(null);
  const [endDate, setEndDate] = useState<LocalDate | null>(null);
  const calendarModel = useRef(new CalendarViewModel()).current;

  return (
    <CalendarContext.Provider value={{ startDate, setStartDate, endDate, setEndDate, calendarModel: calendarModel }}>
      {children}
    </CalendarContext.Provider>
  );
}
