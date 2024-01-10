export function formatEventStartDate(dateString) {
  const startYear = dateString.slice(2, 4);
  const startMonth = dateString.slice(4, 6);
  const startDay = dateString.slice(6, 8);

  return `행사기간: ${startYear}.${startMonth}.${startDay} ~`;
}
export function formatEventEndDate(dateString) {
  const endYear = dateString.slice(10, 12);
  const endMonth = dateString.slice(12, 14);
  const endDay = dateString.slice(14, 16);

  return `${endYear}.${endMonth}.${endDay}`;
}
export function semanticStartDate(dateString) {
  const startYear = dateString.slice(0, 4);
  const startMonth = dateString.slice(4, 6);
  const startDay = dateString.slice(6, 8);

  return `${startYear}-${startMonth}-${startDay}`;
}
export function semanticEventEndDate(dateString) {
  const endYear = dateString.slice(8, 12);
  const endMonth = dateString.slice(12, 14);
  const endDay = dateString.slice(14, 16);

  return `${endYear}-${endMonth}-${endDay}`;
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}