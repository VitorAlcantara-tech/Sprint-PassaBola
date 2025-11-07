import fundoHeader from "../assets/imagemHeader.png";
import logo from "../assets/Logotipo-PassaBola-Branco.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { AdminDropdown } from "./AdminDropdown";
import { Link } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext.jsx";

export default function Header({ menuAberto, setMenuAberto }) {
  const LINKS = [
    { name: "Home", path: "/" },
    { name: "Campeonatos", path: "/campeonatos" },
    { name: "Jogos", path: "/jogos" },
    { name: "Atletas", path: "/atletas" },
  ];

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, userName, login, logout } = useContext(LoginContext);
  

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!email || !senha) {
      alert("Preencha e-mail e senha.");
      return;
    }

    const user = login(email,senha)
    
    if (user || user === null){
      setIsLoginOpen(false);   // <<< fecha o ModalLogin aqui
      // fechar o menu para não exibir a camada que cobre o carrossel
      setMenuAberto(false)
    } else {
      alert("Usuário não encontrado. Verifique e-mail/senha ou cadastre-se.");
    }

    console.log(user)
  };

  const onLogout = () => {
    logout();
    setMenuAberto(false);
    setIsLoginOpen(false);
  };


  return (
    <>
      <header
        className="h-20 md:h-26 bg-cover"
        style={{
          backgroundImage: `url(${fundoHeader})`,
        }}
      >
        <div className="py-3 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="md:hidden text-white z-999"
            >
              {menuAberto ? <IoMdClose size={46} /> : <IoMdMenu size={46} />}
            </button>

            {/* Mobile: botão de login / dropdown de conta */}
            {user === false ? (
              <div
                className={`absolute md:hidden left-25 top-5.5 z-999
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
            ) : user === null ? (
              <div className="absolute md:hidden left-25 top-5.5 z-999">
                <AdminDropdown name={"Adm"} onLogout={onLogout} />
              </div>
            ) : user ? (
              <div className="absolute md:hidden left-25 top-5.5 z-999">
                <AdminDropdown name={userName} onLogout={onLogout} />
              </div>
            ) : null}

            {/* ModalLogin mobile (mantém a renderização para o Dialog controlar abertura) */}
            <div
              className={`absolute md:hidden left-25 top-5.5 z-999 ${menuAberto ? "opacity-100" : "opacity-0"}`}
            >
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
          </div>
          <Link to="/">
            <img
              src={logo}
              alt="Logotipo Passa a bola"
              className="w-14 z-50 md:absolute top-3 left-10 md:w-20 hover:scale-105 duration-300 cursor-pointer"
            />
          </Link>
        </div>
        <div
          className={`fixed z-998 md:hidden top-0 left-0 w-full h-screen bg-[#561EBD] flex flex-col items-center gap-6 text-2xl uppercase transform transition-transform ${menuAberto ? "opacity-100" : "hidden"
            }`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <div className="absolute top-20 left-5 flex flex-col">
            {LINKS.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setMenuAberto(false)}
                className="list-none w-full text-start text-white font-Jockey p-4 hover:bg-[#2e1165] transition-all cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Header Desktop */}
        <div className="absolute top-8 ml-45 sm:left-14">
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
        <div className="hidden md:block top-0">
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

        {/* Desktop: botão de login / dropdown */}
        {user === false ? (
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="hidden md:block absolute right-10 top-10 z-10 text-2xl text-white rounded-full p-2 bg-gray-500/80 cursor-pointer transition-transform duration-300 hover:scale-105"
            aria-label="Abrir login"
          >
            <IoPersonSharp aria-hidden />
          </button>
        ) : user === null ? (
          <div className="hidden md:block absolute right-10 top-10">
            <AdminDropdown name={"Adm"} onLogout={onLogout} />
          </div>
        ) : user ? (
          <div className="hidden md:block absolute right-10 top-10">
            <AdminDropdown name={userName} onLogout={onLogout} />
          </div>
        ) : null}
      </header>
    </>
  );
}
