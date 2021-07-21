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
    user: string;
}

export interface IForgotPassword {
    email: string;
}

export interface IUpdateForgotPassword {
    newPassword: string;
    confirmPassword: string;
}

export * from "./IUser";