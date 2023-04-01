import React, { createContext } from 'react';
import { LocalDate } from '@js-joda/core';

type ContextProps = {
  startDate: LocalDate | null;
  endDate: LocalDate | null;
  setStartDate: React.Dispatch<React.SetStateAction<LocalDate | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<LocalDate | null>>;
};

const CalendarContext = createContext<ContextProps>({});

export default CalendarContext;
