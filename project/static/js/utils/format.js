export const leadingZeros = (number, position) => {
  return ('0' + number).slice(-position);
}

export default {
  leadingZeros,
};
