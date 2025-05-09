import type { LoginResponseType } from '@/views/auth/actions/LoginUser'
export function getUserData(): LoginResponseType {
  try {
    const userData = localStorage.getItem('userData')

    const connectedUser: LoginResponseType = JSON.parse(userData || '{}')
    return connectedUser
  } catch (error) {
    console.error((error as Error).message)
    return {} as LoginResponseType
  }
}
