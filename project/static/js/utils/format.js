export const leadingZeros = (number, position) => {
  return ('0' + number).slice(-position);
}

export const dateToString = (jsDate) => {
  const year = jsDate.getFullYear();
  const month = leadingZeros(jsDate.getMonth() + 1, 2);
  const day = leadingZeros(jsDate.getDate(), 2);
  return `${year}-${month}-${day}`;
}

export default {
  leadingZeros,
  dateToString,
};
