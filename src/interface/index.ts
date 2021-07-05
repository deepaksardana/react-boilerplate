export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string
}

export interface IAuthenticationResponse {
    token: string;
}

export interface IForgotPassword {
    email: string;
}

export * from "./IUser";