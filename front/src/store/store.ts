import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { IAuthResponse } from '../../services/auth/interfaces/responce.interface'
import { IUser } from '../../services/auth/interfaces/user.interface'
import AuthService from '../../services/auth/auth.api'
import {ActivateEmail} from '../components/shared/auth/activateEmail'

export default class Store {
	register(email: string, password: string): void {
		throw new Error('Method not implemented.')
	}
	user = {} as IUser
	isAuth = false
	constructor() {
		makeAutoObservable(this)
	}
	setAuth(bool: boolean) {
		this.isAuth = bool
	}
	setUser(user: IUser) {
		this.user = user
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			localStorage.setItem('token', response.data.accessToken)
			const user = JSON.parse(atob(response.data.accessToken.split('.')[1]))
			user.isActivated=response.data.user.isActivated
			delete user.iat
			delete user.exp
			if (user.isActivated){
				this.setAuth(true)
				this.setUser(user)
			}
			return response.status
		} catch (error) {
			if (axios.isAxiosError(error)) {
			  return  error.response?.data.message || 'Неизвестная ошибка';
			} else if (error instanceof Error) {
			  return (error.message);
			} else {
			  return(error);
			}
		}
	}
	async registration(email: string, password: string, name: string) {
		try {
			const response = await AuthService.registration(email, password, name)
			localStorage.setItem('token', response.data.accessToken)
			const user = JSON.parse(atob(response.data.accessToken.split('.')[1]))
			user.isActivated=response.data.user.isActivated
			delete user.iat
			delete user.exp
			this.setUser(user)
			setTimeout(async () => {
				await AuthService.deleteUser(user.id); 
			}, 120000);
			if (user.isActivated){
				this.setAuth(true)
		
			}
			return response.status
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return  error.response?.data.message || 'Неизвестная ошибка';
			  } else if (error instanceof Error) {
				return (error.message);
			  } else {
				return(error);
			  }
		}
	}
	async logout() {
		try {
			const response = await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e) {
			console.log(e)
		}
	}
	async checkAuth() {
		try {
			const response = await axios.get<IAuthResponse>(
				'http://localhost:4200/api/auth/access',
				{ withCredentials: true }
			)
			localStorage.setItem('token', response.data.accessToken)
			const user = JSON.parse(atob(response.data.accessToken.split('.')[1]))
			user.isActivated=response.data.user.isActivated
			delete user.iat
			delete user.exp
			console.log(user)
			this.setUser(user)
			if (user.isActivated){
				console.log(user)
				this.setAuth(true)
			}
			
		} catch (e) {
			console.log(e)
		}
	}
}
