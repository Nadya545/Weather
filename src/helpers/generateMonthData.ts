export function generateMonthData(
  year: number,
  month: number
): (Date | null)[][] {
  const daysInMonth = new Date(year, month, 0).getDate(); // рассчитываю правильное кол-во дней в каждом месяце и году
  const monthData = [];
  let week = [];

  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); //получаю первый день месяца
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < offset; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    week.push(date);

    if (date.getDay() === 0 || day === daysInMonth) {
      monthData.push(week);
      week = [];
    }
  }

  while (week.length < 7) week.push(null);
  if (week.length > 0) monthData.push(week);

  return monthData;
}
