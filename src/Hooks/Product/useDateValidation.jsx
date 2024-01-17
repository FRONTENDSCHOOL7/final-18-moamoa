import { useState, useEffect } from 'react';

const removeHyphen = (date) => {
  return date ? date.replaceAll('-', '') : '';
};

const useDateValidation = (startDate, endDate) => {
  const [dateSelectionErrorMsg, setDateSelectionErrorMsg] = useState('');

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setDateSelectionErrorMsg('*행사 시작 날짜와 행사 종료 날짜를 다시 확인해주세요.');
      return;
    } else {
      setDateSelectionErrorMsg('');
    }
  }, [startDate, endDate]);

  const selectedDates = [removeHyphen(startDate), removeHyphen(endDate)];
  const progressPeriod = parseInt(selectedDates.join(''));

  return { progressPeriod, dateSelectionErrorMsg };
};

export default useDateValidation;