export const calculateMultiplier = (values, type = 0) =>
  values
    .filter(option => option.type === type)
    .reduce((product, option) => product * option.value, 1)
