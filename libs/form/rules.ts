export const isEmail = (value: string) => {
    if (!value) return 'Email is required'
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return true
    return 'Must be a valid e-mail.'
}
export const isPassword = (value: string) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters long'
    return true
}