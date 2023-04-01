export default class MonthType {
  public static readonly SUNDAY = new MonthType(7, '일요일', 'SUNDAY');
  public static readonly MONDAY = new MonthType(1, '월요일', 'MONDAY');
  public static readonly TUESDAY = new MonthType(2, '화요일', 'TUESDAY');
  public static readonly WEDNESDAY = new MonthType(3, '수요일', 'WEDNESDAY');
  public static readonly THURSDAY = new MonthType(4, '목요일', 'THURSDAY');
  public static readonly FRIDAY = new MonthType(5, '금요일', 'FRIDAY');
  public static readonly SATURDAY = new MonthType(6, '토요일', 'SATURDAY');

  public readonly value: number;
  public readonly title: string;
  public readonly day: string;

  constructor(value: number, title: string, day: string) {
    this.value = value;
    this.title = title;
    this.day = day;
  }

  public static values() {
    return [
      MonthType.SUNDAY,
      MonthType.MONDAY,
      MonthType.TUESDAY,
      MonthType.WEDNESDAY,
      MonthType.THURSDAY,
      MonthType.FRIDAY,
      MonthType.SATURDAY,
    ];
  }
}
