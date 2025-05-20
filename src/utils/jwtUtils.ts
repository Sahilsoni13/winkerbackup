import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
    exp: number;
    [key: string]: any;
}

export const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    try {
        const decoded: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp > currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};