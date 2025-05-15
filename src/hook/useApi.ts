
// hooks/useApi.ts
import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/apiInfo';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 🔐 Token Interceptor using AsyncStorage
api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.log('Token read error:', error);
    }
    return config;
});

// 🎯 useApi hook
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const request = async <T = any>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await api.request<T>({
                method,
                url,
                data,
                ...config,
            });
            return res.data;
        } catch (err: any) {
            setError(err?.response?.data || err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error };
};
