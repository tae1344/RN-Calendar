import { LocalDate } from '@js-joda/core';
import DayType from '../constants/DayType';

export default class DateTimeUtils {
  private localDate: LocalDate;
  private sDate: LocalDate;
  private eDate: LocalDate;

  constructor(date: LocalDate = LocalDate.now()) {
    this.localDate = date;
    this.sDate = this.localDate.withDayOfMonth(1);
    this.eDate = this.localDate.withDayOfMonth(this.localDate.lengthOfMonth());
  }

  public date() {
    return this.localDate;
  }

  public lengthOfMonth() {
    return this.localDate.lengthOfMonth();
  }

  public getFirstDayOfMonth() {
    return this.sDate;
  }

  public getLastDayOfMonth() {
    return this.eDate;
  }

  public getFrontBlanksOfMonth() {
    const valueOfFirstDay = this.sDate.dayOfWeek().value();
    if (valueOfFirstDay === DayType.SUNDAY.value) {
      return 0;
    }
    return valueOfFirstDay;
  }

  public getLastBlanks() {
    const valueOfLastDay = this.eDate.dayOfWeek().value();
    if (valueOfLastDay === DayType.SUNDAY.value) {
      return 6;
    }
    return 6 - valueOfLastDay;
  }
}
