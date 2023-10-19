export const dateFormatter = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};

export const customDate = (date: string) => {
  const [datePart, timePart] = date.split(' ');

  const [_year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');

  const customDate = `${day}/${month} ${hours}:${minutes}`;
  return customDate;
};
