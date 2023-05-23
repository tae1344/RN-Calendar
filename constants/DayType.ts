export default class DayType {
  public static readonly SUNDAY = new DayType(7, '일', '일요일', 'SUNDAY');
  public static readonly MONDAY = new DayType(1, '월', '월요일', 'MONDAY');
  public static readonly TUESDAY = new DayType(2, '화', '화요일', 'TUESDAY');
  public static readonly WEDNESDAY = new DayType(3, '수', '수요일', 'WEDNESDAY');
  public static readonly THURSDAY = new DayType(4, '목', '목요일', 'THURSDAY');
  public static readonly FRIDAY = new DayType(5, '금', '금요일', 'FRIDAY');
  public static readonly SATURDAY = new DayType(6, '토', '토요일', 'SATURDAY');
  public static readonly DEFAULT = new DayType(0, '', '', 'DEFAULT');

  public readonly value: number;
  public readonly w: string;
  public readonly weekday: string;
  public readonly name: string;

  constructor(value: number, w: string, weekday: string, name: string) {
    this.value = value;
    this.w = w;
    this.weekday = weekday;
    this.name = name;
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
