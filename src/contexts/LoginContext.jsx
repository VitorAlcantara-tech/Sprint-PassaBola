import {createContext} from "react"
import useLoginAcess from '@/componentes/hooks/useLoginAcess'

export const LoginContext = createContext()

export function LoginProvider({children}) {
    const {user, userName, login, logout} = useLoginAcess()
    return (
        <LoginContext.Provider value={{user, userName, login, logout}}>
            {children}
        </LoginContext.Provider>
    )
}
