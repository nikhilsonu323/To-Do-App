export interface User{
    username: string;
    password: string;
}

export interface AuthResponse{
    token: string;
    expiresIn: number;
}
