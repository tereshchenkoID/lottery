const EXCEPTION = ['combinations']

export const calculateMultiplier = (values, type = 0) =>
  values
    .filter(
      option => option.type === type && EXCEPTION.indexOf(option.name) === -1,
    )
    .reduce((product, option) => product * option.value, 1)
