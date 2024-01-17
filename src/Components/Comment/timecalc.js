export const SECOND_TO_MS = 1000;
export const MINUTE_TO_SECOND = 60;
export const HOUR_TO_SECOND = MINUTE_TO_SECOND * 60;
export const DAY_TO_SECOND = HOUR_TO_SECOND * 24;
export const WEEK_TO_DAY = 7;
export const WEEK_TO_SECOND = WEEK_TO_DAY * DAY_TO_SECOND;

export const MONTH_TO_DAY = 30.43;
export const MONTH_TO_SECOND = MONTH_TO_DAY * DAY_TO_SECOND;

export const YEAR_TO_DAY = 365.24;
export const YEAR_TO_SECOND = YEAR_TO_DAY * DAY_TO_SECOND;

export default function TimeCalc(created){
  const now = new Date().getTime();
  const date = new Date(created).getTime();

  if(Number.isNaN(date)){
    return "어떤 오후"
  }

  const { floor } = Math;
  const diffToSeconds = (now - date) / SECOND_TO_MS;
  const diffToDay = floor(diffToSeconds / DAY_TO_SECOND);
  const lessThanDay = diffToSeconds < DAY_TO_SECOND;


  if (lessThanDay) {
    if (diffToSeconds < 5 * MINUTE_TO_SECOND) {
      return "방금";
    }


  if (diffToSeconds < HOUR_TO_SECOND) {
    return `${floor(diffToSeconds / MINUTE_TO_SECOND)}분 전`;
  }


    return `${floor(diffToSeconds / HOUR_TO_SECOND)}시간 전`;
  }


  if (diffToDay < WEEK_TO_DAY) {
    return `${diffToDay}일 전`;
  }


  if (diffToDay < 2 * MONTH_TO_DAY) {
    return `${floor(diffToDay / WEEK_TO_DAY)}주 전`;
  }


  if (diffToDay < YEAR_TO_DAY) {
    return `${floor(diffToDay / MONTH_TO_DAY)}개월 전`;
  }


  return `${floor(diffToDay / YEAR_TO_DAY)}년 전`;




}