import { APP } from '../../../../helper/APP'
export interface IRegisterInput {
  name: string
  email: string
  password: string
}

export interface IRegisterResponseType {
  user: {
    id: number
    name: string
    email: string
  }
  message: string
}
export async function createUser(input: IRegisterInput): Promise<IRegisterResponseType> {
  try {
    const res = await fetch(`${APP.laravelApiBaseUrl}/register`, {
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
