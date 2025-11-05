import { Link } from "react-router-dom";
import logotipo from "../../assets/Logotipo-PassaBola-Branco.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import ModalLogin from "../ModalLogin";
import { createContext, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext.jsx";
import useLoginAcess from "../hooks/useLoginAcess";
import { AdminDropdown } from "../AdminDropdown";


export const UserContext = createContext();

export default function HeaderHome({ menuAberto, setMenuAberto }) {
  const LINKS = [
    { name: "Home", path: "/" },
    { name: "Campeonatos", path: "/campeonatos" },
    { name: "Jogos", path: "/jogos" },
    { name: "Atletas", path: "/atletas" },
  ];

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useS
tate("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const {user, login} = useContext(LoginContext)

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!email || !senha) {
      alert("Preencha e-mail e senha.");
      return;
    }

    const user = login(email,senha)
    
    if (user || user === null){
    setIsLoginOpen(false);   // <<< fecha o ModalLogin aqui
    setMenuAberto(!menuAberto)
    } else {
      alert("Usuário não encontrado. Verifique e-mail/senha ou cadastre-se.");
    }

    console.log(user)
  };

 
  return (
    <>
      <header className="w-full flex justify-between relative">
        {/* Menu Mobile */}
        <div className="flex">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="absolute top-10 left-8 md:hidden text-white z-50"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            {menuAberto ? <IoMdClose size={46} /> : <IoMdMenu size={46} />}
          </button>
          

          {/* Botão de login/admin no mobile */}
          {user === false ? (
            <div
              className={`absolute md:hidden left-26 top-11 z-10
                        ${menuAberto ? "opacity-100" : "opacity-0"}`}
            >
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="text-2xl text-white rounded-full p-2 bg-gray-500/80 cursor-pointer transition-transform duration-300 hover:scale-105"
                aria-label="Abrir login"
              >
                <IoPersonSharp aria-hidden />
              </button>
            </div>
          ) : (
            <div className="absolute md:hidden left-26 top-11 z-[100]">
              <AdminDropdown />
            </div>
          )}
  
        </div>

  
        <div
          className={`absolute md:hidden top-0 left-0 w-full h-screen bg-[#561EBD] flex flex-col items-center gap-6 text-2xl uppercase transform transition-transform ${menuAberto ? "opacity-100" : "opacity-0"
            }`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          
          <div className="absolute top-30 left-5">
            {LINKS.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="list-none w-full block text-start text-white font-Jockey p-4 hover:bg-[#2e1165] transition-all cursor-pointer"
                onClick={() => setMenuAberto(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        
        <Link to="/">
          <img
            src={logotipo}
            alt="Logotipo Passa Bola"
            className="w-18 top-6 sm:w-24 right-6 sm:top-8 cursor-pointer hover:scale-105 duration-300 absolute md:left-16 md:top-10"
          />
        </Link>

        
        <div className="absolute top-10 ml-45 sm:left-8">
          <nav
            className="hidden font-Jockey uppercase sm:text-[25px] md:flex items-center gap-12"
            aria-label="Principal"
          >
            {LINKS.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-white relative cursor-pointer
                after:block after:h-[2px] after:bg-white/0 hover:after:bg-white
                after:transition-all after:w-0 hover:after:w-full after:mt-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Botão de login/admin no desktop */}
        {user === false ? (
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="hidden md:block absolute right-10 top-10 z-10 text-2xl text-white rounded-full p-2 bg-gray-500/80 cursor-pointer transition-transform duration-300 hover:scale-105"
            aria-label="Abrir login"
          >
            <IoPersonSharp aria-hidden />
          </button>
        ) : (
          <div className="hidden md:block absolute right-10 top-10">
            <AdminDropdown />
          </div>
        )}

        {/* Modal de Login (usado quando clica no botão) */}
        <div className="hidden md:block">
          <ModalLogin
            open={isLoginOpen}
            onOpenChange={setIsLoginOpen}
            email={email}
            senha={senha}
            onEmail={(v) => setEmail(v)}
            onSenha={(v) => setSenha(v)}
            onSubmit={handleLogin}
          />
        </div>

        {/* Modal de Login Mobile */}
        {user === false && (
          <div className="md:hidden">
            <ModalLogin
              open={isLoginOpen}
              onOpenChange={setIsLoginOpen}
              email={email}
              senha={senha}
              onEmail={(v) => setEmail(v)}
              onSenha={(v) => setSenha(v)}
              onSubmit={handleLogin}
            />
          </div>
        )}
      </header>
    </>
  );
}
