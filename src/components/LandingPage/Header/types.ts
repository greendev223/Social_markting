export interface SignupForm {
  // username: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface LoginForm {
  email: string
  password: string
  remember: boolean
}
