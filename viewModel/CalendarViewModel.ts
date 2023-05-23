import { LocalDate } from '@js-joda/core';

export default class CalendarViewModel {
  public startDate: LocalDate | null = null;

  public endDate: LocalDate | null = null;

  public year: number = LocalDate.now().year();

  public month: number = LocalDate.now().monthValue();

  public changeStartDate(date: LocalDate | null) {
    this.startDate = date;
  }

  public changeEndDate(date: LocalDate | null) {
    this.endDate = date;
  }
}
