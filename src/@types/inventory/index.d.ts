import { ReactNode, CSSProperties } from 'react'

declare namespace Inventory {
    export interface User {
        id: string;
        name: string;
    }

    export interface Product {
        id?: string;
        name?: string;
        category?: string;
        quantity?: number;
        expiration?: string;
        owner?: string;
    }
    
    export interface ProviderProps {
        children: ReactNode
    }

    export interface ContainerProps {
        cstyle?: CSSProperties | undefined;
        children?: ReactNode | undefined;
    }
    
    export interface ThemeContextData {
        theme: string;
        toggleTheme: ()=>void;
    }

    export interface AuthContextData {
        user: User|undefined;
        handleLoginWithGoogle: ()=>Promise<void>;
        handleLoginWithGithub?: ()=>Promise<void>;
        handleLoginWithEmailAndPassword: (email: string, password: string)=>Promise<void>;
        handleSignUpWithEmailAndPassword:(email: string, password: string)=>Promise<void>;
        handleLogout:()=>Promise<void>
    }

    export interface INavigationContext {
        currentComponent: string|undefined;
        changeCurrentComponent: (component: string) => void;
    }  

    export interface ProductContext {
        products: Product[] | undefined;
        handleRetrieveData: ()=>void;
        handleDeleteData:(id:string)=>void;
    }  
}