
// // hooks/useApi.ts
// import { useState } from 'react';
// import axios, { AxiosRequestConfig } from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_BASE_URL } from '@/apiInfo';
// import Toast from 'react-native-toast-message';

// const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // 🔐 Token Interceptor using AsyncStorage
// api.interceptors.request.use(async (config) => {
//     try {
//         const token = await AsyncStorage.getItem('accessToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     } catch (error) {
//         console.log('Token read error:', error);
//     }
//     return config;
// });

// // 🎯 useApi hook
// export const useApi = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<any>(null);

//     const request = async <T = any>(
//         method: 'GET' | 'POST' | 'PUT' | 'DELETE',
//         url: string,
//         data?: any,
//         config?: AxiosRequestConfig
//     ): Promise<T | null> => {
//         setLoading(true);
//         setError(null);

//         try {
//             const res = await api.request<T>({
//                 method,
//                 url,
//                 data,
//                 ...config,
//             });
//             return res.data;
//         } catch (err: any) {
//              Toast.show({
//                             type: 'error',
//                             text1: "Something went wrong",
//                             text2: error?.message || "Please try again later",
//                         });
//             setError(err?.response?.data || err.message);
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { request, loading, error };
// };



// hooks/useAppMutation.ts
// import { useMutation, UseMutationOptions } from '@tanstack/react-query';
// import axios, { AxiosRequestConfig } from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import { API_BASE_URL } from '@/apiInfo';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Token Interceptor
// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// type RequestParams = {
//   url: string;
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   data?: any;
//   config?: AxiosRequestConfig;
//   showToast?: boolean;
// };

// export const useAppMutation = <TResponse = any, TError = any>(
//   options?: UseMutationOptions<TResponse, TError, RequestParams>
// ) => {
//   const mutation = useMutation<TResponse, TError, RequestParams>({
//     mutationFn: async ({ url, method = 'POST', data, config }: RequestParams) => {
//       const response = await api.request<TResponse>({
//         method,
//         url,
//         data,
//         ...config,
//       });
//       return response.data;
//     },
//     onError: (error: any, variables, context) => {
//       if (variables?.showToast) {
//         Toast.show({
//           type: 'error',
//           text1: 'Something went wrong',
//           text2: error?.message || 'Please try again later',
//         });
//       }
//       options?.onError?.(error, variables, context);
//     },
//     onSuccess: (data, variables, context) => {
//       if (variables?.showToast) {
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Operation completed successfully',
//         });
//       }
//       options?.onSuccess?.(data, variables, context);
//     },
//     ...options,
//   });

//   return mutation;
// };



import { useMutation } from '@tanstack/react-query';
import axios, { Method } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '@/apiInfo';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type AppMutationOptions = {
    url: string;
    method?: Method;
    data?: any;
    showToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
};

export const useApi = () => {
    const mutationFn = async ({
        url,
        method = 'POST',
        data,
    }: AppMutationOptions) => {
        const token = await AsyncStorage.getItem('idToken'); // 🔐 get token
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers.Authorization = token;
        }

        const response = await axios({
            method,
            url: API_BASE_URL + url,
            data,
            headers,
        });

        return response.data;
    };
    const {
        mutate,
        isPending,
        isError,
        isSuccess,
        data,
        error,
        reset,
    } = useMutation({
        mutationFn: async (options: AppMutationOptions) => {
            return await mutationFn(options);
        },
        onSuccess: (response, variables) => {
            if (variables.showToast) {
                const message =
                    response?.message ||
                    variables.successMessage ||
                    'Success ✅';

                Toast.show({
                    type: 'success',
                    text1: message,
                    visibilityTime: 1500
                });
            }
        },

        onError: (err: any, variables) => {
            if (variables.showToast) {
                const message =
                    err?.response?.data?.message || // if backend sends a specific error message
                    variables.errorMessage || // fallback to custom error message
                    err.message || // general error
                    'Something went wrong ❌';

                Toast.show({
                    type: 'error',
                    text1: 'Error ❌',
                    text2: message,
                    visibilityTime: 1500
                });
            }
        },
    });

    return {
        mutate,
        isPending,
        isError,
        isSuccess,
        data,
        error,
        reset,
    };
};
