import { APP } from '../../../../helper/APP'

export interface ILoginInput {
  email: string
  password: string
}
export interface ILoginResponseType {
  user: {
    id: number
    name: string
    email: string
  }
  token: string
  message: string
  isLogged: boolean
}
export async function loginUser(input: ILoginInput): Promise<ILoginResponseType> {
  try {
    const res = await fetch(`${APP.laravelApiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    return await res.json()
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
