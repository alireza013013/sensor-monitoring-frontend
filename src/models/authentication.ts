import type { Device } from "@/models"

export interface Token {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireIn: number;
    refreshTokenExpireIn: number;
    roles: string;
}

export interface TokenStorage {
    token: Token,
    isValidated: boolean
}


export interface User {
    id?: string
    code?: string
    registerDate?: string
    userName?: string
    password?: string
    firstName?: string
    lastName?: string
    role?: string
    devices?: Device[]
}