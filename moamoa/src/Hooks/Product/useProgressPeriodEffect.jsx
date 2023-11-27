import { useState, useEffect } from 'react';

const useProgressPeriodEffect = (startDate, endDate) => {
  const [progressPeriod, setProgressPeriod] = useState(1);
  const [dateSelectionErrorMsg, setDateSelectionErrorMsg] = useState('');

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      setDateSelectionErrorMsg('행사 시작 날짜와 행사 종료 날짜를 다시 확인해주세요.');
      return;
    } else {
      setDateSelectionErrorMsg('');
    }

    const selectedDates = [];
    if (startDate) {
      selectedDates.push(startDate.replaceAll('-', ''));
    }
    if (endDate) {
      selectedDates.push(endDate.replaceAll('-', ''));
    }
    const combineDates = parseInt(selectedDates.join(''));
    setProgressPeriod(combineDates);
  }, [startDate, endDate]);

  return { progressPeriod, dateSelectionErrorMsg };
};

export default useProgressPeriodEffect;
