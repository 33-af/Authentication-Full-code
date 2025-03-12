import { create } from 'zustand';
import axios from "axios";
import { IAuthStore, ISignUp, IAuthLogin, IVerifyEmail, ILogout, IForgotPassword, IResetPassword } from '@/types/AuthStore';
import { toast } from 'react-toastify';



export const useAuthStore = create<IAuthStore>((set, get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signUp: async (email: string, password: string, name: string): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await axios.post<ISignUp>(`${process.env.REACT_APP_BACKEND_API}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data.message || toast.error("Error while signing up"), isLoading: false });
            } else {
                set({ error: "Unknown error occurred", isLoading: false });
            }
            throw error;
        }
    },
    login: async (email: string, password: string): Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await axios.post<IAuthLogin>(`${process.env.REACT_APP_BACKEND_API}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                isLoading: false
            });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Ошибка Axios
                set({ error: error.response?.data?.message || toast.error("Error while logging in"), isLoading: false });
            } else if (error instanceof Error) {
                // Общая ошибка, проверяем, является ли это экземпляром Error
                set({
                    error: error.message || "Unknown error occurred",
                    isLoading: false,
                });
            } else {
                // Ошибка неизвестного типа
                set({
                    error: "Unknown error occurred",
                    isLoading: false,
                });
            }
        }
    },
    emailVerification: async (numberVerification: string): Promise<IVerifyEmail | undefined> => {
        set({ isLoading: true });
        try {
            const response = await axios.post<IVerifyEmail>(`${process.env.REACT_APP_BACKEND_API}/verify-email`, { numberVerification });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Ошибка Axios
                set({ error: error.response?.data?.message || toast.error("Error while verifying email"), isLoading: false });
            } else if (error instanceof Error) {
                set({
                    error: error.message || "Unknown error occurred",
                    isLoading: false,
                });
            } else {
                set({
                    error: "Unknown error occurred",
                    isLoading: false,
                });
            }
        }
    },
    logout: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            await axios.post<ILogout>(`${process.env.REACT_APP_BACKEND_API}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Ошибка Axios
                set({ error: error.response?.data?.message || toast.error("Error while Logout from account"), isLoading: false });
            } else if (error instanceof Error) {
                set({
                    error: error.message || "Unknown error occurred",
                    isLoading: false,
                });
            } else {
                set({
                    error: "Unknown error occurred",
                    isLoading: false,
                });
            }
        }
    },
    forgotPassword: async (email:string):Promise<void> => {
        set({ isLoading: true });
        try {
            const response = await axios.post<IForgotPassword>(`${process.env.REACT_APP_BACKEND_API}/forgot-password`, { email });
            set({message:response.data?.message, isLoading:false});
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ error: error.response?.data?.message || toast.error("Error while sending reset password email"), isLoading: false });
            } else if (error instanceof Error) {
                set({
                    error: error.message || "Unknown error occurred",
                    isLoading: false,
                });
            } else {
                set({
                    error: "Unknown error occurred",
                    isLoading: false,
                });
            }
        }
    },
    resetPassword: async(token: string | undefined, password:string) =>{
        set({isLoading:true});
        try{
            const response = await axios.post<IResetPassword>(`${process.env.REACT_APP_BACKEND_API}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              const errorMessage = error.response?.data?.message || "Error while resetting password";
              toast.error(errorMessage); // Вывод ошибки
              set({ error: errorMessage, isLoading: false });
            } else if (error instanceof Error) {
              toast.error(error.message);
              set({ error: error.message, isLoading: false });
            } else {
              toast.error("Unknown error occurred");
              set({ error: "Unknown error occurred", isLoading: false });
            }
          }
    }
}))