import { APP } from './APP'
export type HttpVerbType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

export async function makeHttpReq<TInput, TResponse>(
  endPoint: string,
  method: HttpVerbType,
  input?: TInput,
) {
  try {
    const res = await fetch(`${APP.laravelApiBaseUrl}/${endPoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    const data: TResponse = await res.json()

    return data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
