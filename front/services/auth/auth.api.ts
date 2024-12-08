import { AxiosResponse } from 'axios'
import $api from '../auth/interceptor'
import { IAuthResponse } from '../auth/interfaces/responce.interface'
export default class AuthService {
	static deleteUser: any
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('auth/login', { email, password })
	}
	static async registration(
		email: string,
		password: string,
		name: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('auth/register', { email, password, name })
	}
	static async logout(): Promise<AxiosResponse<IAuthResponse>> {
		return $api.get<IAuthResponse>('auth/logout')
	}
}
