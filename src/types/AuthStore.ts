export interface IAuthStore{
    user:IUser| null;
    isAuthenticated: boolean,
	error: null | string,
	isLoading: boolean,
	isCheckingAuth: boolean,
	message: null  | string,
    signUp: (name:string, email:string, password: string)=> Promise<void>
    login:(password:string, email:string)=> Promise<void>
    emailVerification:(numberVerification:string) =>Promise<IVerifyEmail | undefined>;
    logout:()=> Promise<void>
    forgotPassword:(email:string)=>Promise<void>
    resetPassword:(token:string | undefined ,password:string) => Promise<void>
}

export interface IUser {
    name: string;
    email: string;
    password: string; 
    createdAt:Date;
    lastLogin: string
  }
  
 
  export interface ISignUp {
    user: IUser; 
  }

  export interface IAuthLogin{
    // email:string;
    // password:string
    user:IUser
  }

  export interface IVerifyEmail  {
    // numberVerification: string;
    user:IUser
  }

  export interface ILogout{
    user:null;
  }

  export interface IForgotPassword{
    message: string | null | undefined
  }

  export interface IResetPassword{
    message: string | null | undefined
    token:string;
    password:string
  }

