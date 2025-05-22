// import React, { createContext, useContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { isTokenValid } from '../utils/jwtUtils';

// export interface AuthContextType {
//     isLoggedIn: boolean;
//     token: string | null;
//     login: (newToken: string) => Promise<void>;
//     logout: () => Promise<void>;
// }

// // Define navigation param list
// type RootStackParamList = {
//     OnboardingScreen: undefined;
//     MainTab: undefined;
// };


// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//     const [token, setToken] = useState<string | null>(null);
//     const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
//     // Check login status on app start
//     useEffect(() => {
//         const checkLoginStatus = async () => {

//             try {
//                 const storedToken = await AsyncStorage.getItem('idToken');
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 if (storedToken && isTokenValid(storedToken)) {
//                     setToken(storedToken);
//                     setIsLoggedIn(true);
//                 } else {
//                     await AsyncStorage.removeItem('idToken');
//                     setIsLoggedIn(false);
//                     navigation.reset({
//                         index: 0,
//                         routes: [{ name: 'OnboardingScreen' }],
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error checking login status:', error);
//             }
//         };
//         checkLoginStatus();
//     }, [navigation]);

//     // Handle login
//     const login = async (newToken: string) => {
//         try {
//             await AsyncStorage.setItem('idToken', newToken);
//             setToken(newToken);
//             setIsLoggedIn(true);
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     };

//     // Handle logout
//     const logout = async () => {
//         try {
//             await AsyncStorage.removeItem('idToken');
//             setToken(null);
//             setIsLoggedIn(false);
//             navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'OnboardingScreen' }],
//             });
//         } catch (error) {
//             console.error('Error during logout:', error);
//         }
//     };

//     // Monitor token expiration
//     useEffect(() => {
//         const checkTokenExpiration = async () => {
//             if (token && !isTokenValid(token)) {
//                 await logout();
//             }
//         };
//         checkTokenExpiration();
//         const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
//         return () => clearInterval(interval);
//     }, [token]);

//     const value: AuthContextType = { isLoggedIn, token, login, logout };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Custom hook to use AuthContext
// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { isTokenValid } from '../utils/jwtUtils';

export interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (newToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

type RootStackParamList = {
  OnboardingScreen: undefined;
  MainTab: undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Check login status on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('idToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        if (storedToken && isTokenValid(storedToken)) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
          setIsLoggedIn(true);
        } else if (storedRefreshToken) {
          // Try refreshing the token if it's expired but refresh token exists
          await refreshAccessToken(storedRefreshToken);
        } else {
          await AsyncStorage.multiRemove(['idToken', 'refreshToken']);
          setIsLoggedIn(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'OnboardingScreen' }],
          });
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        await logout();
      }
    };
    checkLoginStatus();
  }, [navigation]);

  // Handle login
  const login = async (newToken: string, newRefreshToken: string) => {
    try {
      await AsyncStorage.multiSet([
        ['idToken', newToken],
        ['refreshToken', newRefreshToken],
      ]);
      setToken(newToken);
      setRefreshToken(newRefreshToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Handle logout
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['idToken', 'refreshToken']);
      setToken(null);
      setRefreshToken(null);
      setIsLoggedIn(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingScreen' }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Refresh token function
  const refreshAccessToken = async (currentRefreshToken: string) => {
    try {
      const response = await axios.post('/auth/refresh-token', {
        refreshToken: currentRefreshToken,
      });
      const { accessToken, idToken, refreshToken: newRefreshToken } = response.data;
      const newToken = idToken || accessToken; // Use idToken if provided, else accessToken
      if (!newToken) {
        throw new Error('No valid token in refresh response');
      }
      await AsyncStorage.multiSet([
        ['idToken', newToken],
        ['refreshToken', newRefreshToken || currentRefreshToken], // Keep old refresh token if not updated
      ]);
      setToken(newToken);
      setRefreshToken(newRefreshToken || currentRefreshToken);
      setIsLoggedIn(true);
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Error refreshing token:', error);
      await logout(); // Logout if refresh fails
    }
  };

  // Monitor token expiration and refresh proactively
  useEffect(() => {
    if (!token || !refreshToken) return;

    const checkTokenExpiration = async () => {
      if (!isTokenValid(token)) {
        await refreshAccessToken(refreshToken);
      } else {
        // Check if token is close to expiring (e.g., within 5 minutes)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        if (expiry - now < 5 * 60 * 1000) { // Less than 5 minutes left
          await refreshAccessToken(refreshToken);
        }
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [token, refreshToken]);

  const value: AuthContextType = { isLoggedIn, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};