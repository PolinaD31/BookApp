const getStartOfWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const startDate = new Date(today.setDate(diff));
  return startDate.toISOString().split('T')[0];
};

const getEndOfWeek = (startDate) => {
  const startDateFormated = new Date(startDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDateFormated.getDate() + 6);
  return endDate;
}

const changeWeek = (direction, currentWeekStart, setCurrentWeekStart, setWeekEnd) => {
  const newWeekStart = new Date(currentWeekStart);
  if (direction === 'next') {
    newWeekStart.setDate(newWeekStart.getDate() + 7);
  } else {
    newWeekStart.setDate(newWeekStart.getDate() - 7);
  }
  setCurrentWeekStart(newWeekStart.toISOString().split('T')[0]);
  setWeekEnd(getEndOfWeek(newWeekStart).toISOString().split('T')[0])
};

const calculateWeeklyReading = (startDate, data) => {
  let weeklyReading = [];
  let startDateCopy = new Date(startDate);
  let endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  while (startDateCopy <= endDate) {
    const dateFormated = startDateCopy.toISOString().split('T')[0];
    weeklyReading.push(data[dateFormated] || 0);
    startDateCopy.setDate(startDateCopy.getDate() + 1);
  }

  return weeklyReading;
};

const formatDate = (date) => {
  const dateFormated = new Date(date);
  return dateFormated.getUTCDate() + " " + dateFormated.toLocaleString('default', { month: 'long' });
}

export { getStartOfWeek, changeWeek, calculateWeeklyReading, formatDate, getEndOfWeek};
