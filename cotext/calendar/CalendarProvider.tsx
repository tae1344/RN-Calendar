import CalendarContext from './CalendarContext';
import React, { ReactNode, useEffect, useState } from 'react';
import { LocalDate } from '@js-joda/core';

type ProviderProps = {
  children: ReactNode | undefined;
  sDate?: string;
  eDate?: string;
};

export default function CalendarProvider<T>({ children }: ProviderProps) {
  const [startDate, setStartDate] = useState<LocalDate | null>(null);
  const [endDate, setEndDate] = useState<LocalDate | null>(null);

  return (
    <CalendarContext.Provider value={{ startDate, setStartDate, endDate, setEndDate }}>
      {children}
    </CalendarContext.Provider>
  );
}
