import { useState } from "react";

const useLoginAcess = () => {
    const [user, setUser] = useState(false);
    const [userName, setUserName] = useState("");
    
    const login = (email, senha) => {
        const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
        let userFound = false;
        let foundName = "";

        if (email === 'admin@gmail.com' && senha === 'admin') {
            userFound = null;
            foundName = "Admin";
        } else {
            const profile = profiles.find((p) => p.email === email && p.senha === senha);
            if (profile) {
                userFound = true;
                foundName = profile.nome;
            }
        }
        
        setUser(userFound);
        setUserName(foundName);
        return userFound;
    }

    const logout = () => {
        setUser(false);
        setUserName("");
    }

    return { user, userName, login, logout }
}

export default useLoginAcess