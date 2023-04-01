import { LocalDate } from '@js-joda/core';

export default class DateTimeUtils {
  private localDate: LocalDate;
  private static sDate: LocalDate;
  private static eDate: LocalDate;

  constructor(date: LocalDate = LocalDate.now()) {
    this.localDate = date;
    DateTimeUtils.sDate = this.localDate.withDayOfMonth(1);
    DateTimeUtils.eDate = this.localDate.withDayOfMonth(this.localDate.lengthOfMonth());
  }

  public date() {
    return this.localDate;
  }

  public lengthOfMonth() {
    return this.localDate.lengthOfMonth();
  }

  public getFirstDayOfMonth() {
    return DateTimeUtils.sDate;
  }

  public getLastDayOfMonth() {
    return DateTimeUtils.eDate;
  }

  public getFrontBlanksOfMonth() {
    const valueOfFirstDay = DateTimeUtils.sDate.dayOfWeek().value();
    if (valueOfFirstDay === 7) {
      return 0;
    }
    return valueOfFirstDay;
  }

  public getLastBlanks() {
    const valueOfLastDay = DateTimeUtils.eDate.dayOfWeek().value();
    if (valueOfLastDay === 7) {
      return 6;
    }
    return 6 - valueOfLastDay;
  }
}
