export default class DayType {
  public static readonly SUNDAY = new DayType(7, '일요일', 'SUNDAY');
  public static readonly MONDAY = new DayType(1, '월요일', 'MONDAY');
  public static readonly TUESDAY = new DayType(2, '화요일', 'TUESDAY');
  public static readonly WEDNESDAY = new DayType(3, '수요일', 'WEDNESDAY');
  public static readonly THURSDAY = new DayType(4, '목요일', 'THURSDAY');
  public static readonly FRIDAY = new DayType(5, '금요일', 'FRIDAY');
  public static readonly SATURDAY = new DayType(6, '토요일', 'SATURDAY');
  public static readonly DEFAULT = new DayType(0, '', 'DEFAULT');

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
      DayType.SUNDAY,
      DayType.MONDAY,
      DayType.TUESDAY,
      DayType.WEDNESDAY,
      DayType.THURSDAY,
      DayType.FRIDAY,
      DayType.SATURDAY,
    ];
  }
}
