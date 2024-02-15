enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export const dayOfWeekNameMap: Record<DayOfWeek, string> = {
  [DayOfWeek.Sunday]: "Chủ Nhật",
  [DayOfWeek.Monday]: "Thứ Hai",
  [DayOfWeek.Tuesday]: "Thứ Ba",
  [DayOfWeek.Wednesday]: "Thứ Tư",
  [DayOfWeek.Thursday]: "Thứ Năm",
  [DayOfWeek.Friday]: "Thứ Sáu",
  [DayOfWeek.Saturday]: "Thứ Bảy",
};

export default DayOfWeek;
