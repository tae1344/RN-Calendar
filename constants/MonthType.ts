export default class MonthType {
  public static readonly JANUARY = new MonthType(1, '1월', 'JANUARY');
  public static readonly FEBRUARY = new MonthType(2, '2월', 'FEBRUARY');
  public static readonly MARCH = new MonthType(3, '3월', 'MARCH');
  public static readonly APRIL = new MonthType(4, '4월', 'APRIL');
  public static readonly MAY = new MonthType(5, '5월', 'MAY');
  public static readonly JUNE = new MonthType(6, '6월', 'JUNE');
  public static readonly JULY = new MonthType(7, '7월', 'JULY');
  public static readonly AUGUST = new MonthType(8, '8월', 'AUGUST');
  public static readonly SEPTEMBER = new MonthType(9, '9월', 'SEPTEMBER');
  public static readonly OCTOBER = new MonthType(10, '10월', 'OCTOBER');
  public static readonly NOVEMBER = new MonthType(11, '11월', 'NOVEMBER');
  public static readonly DECEMBER = new MonthType(12, '12월', 'DECEMBER');

  public readonly value: number;
  public readonly title: string;
  public readonly month: string;

  constructor(value: number, title: string, month: string) {
    this.value = value;
    this.title = title;
    this.month = month;
  }

  public static values() {
    return [
      MonthType.JANUARY,
      MonthType.FEBRUARY,
      MonthType.MARCH,
      MonthType.APRIL,
      MonthType.MAY,
      MonthType.JUNE,
      MonthType.JULY,
      MonthType.AUGUST,
      MonthType.SEPTEMBER,
      MonthType.OCTOBER,
      MonthType.NOVEMBER,
      MonthType.DECEMBER,
    ];
  }
}
