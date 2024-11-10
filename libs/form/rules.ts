export const isEmail = (value: string) => {
  if (!value) return 'Email is required'
  if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return true
  return 'Must be a valid e-mail.'
}
export const isPassword = (value: string) => {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Password must be at least 8 characters long'
  return true
}
export const noZeroStater = (value: string) => {
  if (!value) return 'Value is required'
  if (/^0/.test(value)) return 'Value must not start with zero'
  return true
}
export const passwordConfirmation = (value: string, password: string) => {
  if (!value) return 'Confirmation password is required'
  if (value !== password) {
    return 'Passwords do not match'
  }
  return true
}
export const isVerificationCode = (value: string) => {
  if (!value) return 'Verification code is required'
}
