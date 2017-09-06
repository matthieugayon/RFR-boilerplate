export const required = val => val && val.length

export const isEmail = val => {
  const test = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
  return test
}

export const passwordsMatch = ({ password, confirmPassword }) => {
  return password === confirmPassword
}
