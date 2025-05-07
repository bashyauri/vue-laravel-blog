import { APP } from './APP'
import { getUserData } from './getUser'

export type HttpVerb = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
export type HttpHeaders = Record<string, string>

export interface HttpRequestOptions<TInput> {
  method: HttpVerb
  endpoint: string
  input?: TInput
  headers?: HttpHeaders
}

export async function makeHttpRequest<TInput, TResponse>(
  options: HttpRequestOptions<TInput>,
): Promise<TResponse> {
  const { method, endpoint, input, headers = {} } = options

  try {
    const userData = getUserData()
    const defaultHeaders: HttpHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(userData?.token && { Authorization: `Bearer ${userData.token}` }),
      ...headers,
    }

    const url = `${APP.laravelApiBaseUrl}/${endpoint.replace(/^\//, '')}`
    const response = await fetch(url, {
      method,
      headers: defaultHeaders,
      body: input ? JSON.stringify(input) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`)
    }

    return (await response.json()) as TResponse
  } catch (error) {
    console.error(`HTTP request failed to ${endpoint}:`, error)
    throw error instanceof Error ? error : new Error('Unknown HTTP request error')
  }
}
