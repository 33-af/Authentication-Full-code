import {z} from 'zod';
import { EmailPattern } from '@/paterns/pattern';

export const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .refine((text) => EmailPattern.test(text), {
            message: 'Email not valid',
        }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters' }), 
    createdAt: z.date(),
    isVerified: z.boolean().default(false),
    variant: z.literal("signUp")
});

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .refine((text) => EmailPattern.test(text), {
            message: 'Email not valid',
        }),
    password: z.string().min(6, { message: 'Password is required' }),
    variant: z.literal("login")
});

export const UserProfile  = z.object({
    name: z.string().min(1, {message: "Required"}),
    email: z.string().min(1, {message: "Email is required"}).refine((text) => EmailPattern.test(text),{
        message: "Email not valid",
    }),
    password: z.string(),
    createdAt: z.string().date(),
    lastLogin: z.string().date(),
    isVerified: z.boolean(),
    variant: z.literal("profile")
})


export const schema = z
    .discriminatedUnion('variant', [
        z.object({ variant: z.literal('signUp') }).merge(signUpSchema),
        z.object({ variant: z.literal('login') }).merge(loginSchema),
        z.object({ variant: z.literal('profile') }).merge(UserProfile),
    ]);

    export type Schema  = z.infer<typeof schema>
    export type SignUpSchemaType = z.infer<typeof signUpSchema>;
    export type loginSchemaType = z.infer<typeof loginSchema>

    export const signUpDefaultValues: Schema = {
        variant: 'signUp',
        name: '',
        email: '',
        password: '',
        createdAt: new Date(),
        isVerified: false,
    };

    export const loginDefaultValues: Schema = {
        variant: 'login',
        email: '',
        password: '',
    };
    
    export const profileDefaultValues: Schema = {
        variant: 'profile',
        name: '',
        email: '',
        password: '',
        createdAt: new Date().toString(),
        lastLogin: new Date().toString(),
        isVerified: false,
    };
    



