
export default function Datecalc(data) {

  const inputDate = data;
  const dateset = inputDate.split('').slice(0, 10).join('');
  const year = dateset.slice(0, 4);
  const month = dateset.slice(5, 7);
  const day = dateset.slice(8, 10);
  const outputDate = `${year}년 ${month}월 ${day}일`;

  return outputDate
}
  
  
