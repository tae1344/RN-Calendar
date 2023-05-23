import React, { createContext } from 'react';
import { LocalDate } from '@js-joda/core';
import CalendarViewModel from '../../viewModel/CalendarViewModel';

type ContextProps = {
  startDate: LocalDate | null;
  endDate: LocalDate | null;
  setStartDate: React.Dispatch<React.SetStateAction<LocalDate | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<LocalDate | null>>;
  calendarModel: CalendarViewModel;
};

const CalendarContext = createContext<ContextProps>({});

export default CalendarContext;
